import { TaskWrapperOptions } from '../home/homeComponents/taskWrapper';
import { updateWinningValue } from './functionUpdateWinningValue';
import { createWheel } from './wheelComponents/createWheel';
import { playPauseAudio } from './functionPlayAudio';

export function animate(
  canvasWheel: HTMLCanvasElement,
  items: TaskWrapperOptions[],
  colors: string[],
  inputElement: HTMLInputElement,
  rotationAngle: { value: number },
  step: { value: number },
  startTime: { value: number | -1 },
  winningValue: HTMLParagraphElement,
) {
  const ctx = canvasWheel.getContext('2d');
  if (!ctx) {
    return;
  }
  // Получаем длительность анимации из inputElement.value
  const duration = parseFloat(inputElement.value);

  // Устанавливаем время начала анимации
  if (startTime.value === -1) {
    startTime.value = performance.now();

    // Проверяем состояние звука и запускаем аудио
    const storedSoundState = localStorage.getItem('soundState');
    const soundPermission = storedSoundState
      ? JSON.parse(storedSoundState).sound
      : true; // По умолчанию звук включён
    playPauseAudio(duration, soundPermission);
  }

  // Вычисляем прошедшее время
  const currentTime = performance.now();
  const elapsedTime = (currentTime - startTime.value) / 1000; // Время в секундах
  // Очищаем холст перед отрисовкой
  ctx.clearRect(0, 0, canvasWheel.width, canvasWheel.height);
  // Ускоряем вращение в первой половине анимации
  if (elapsedTime < duration / 2) {
    step.value += 0.001; // Ускоряем вращение
  }
  // Замедляем вращение во второй половине анимации
  else if (elapsedTime < duration) {
    step.value -= 0.001; // Замедляем вращение
    if (step.value < 0.001) step.value = 0.001; // Минимальная скорость, чтобы не остановиться
  }
  // Останавливаем анимацию, когда время истекло
  else {
    createWheel(canvasWheel, rotationAngle.value, colors, items); // Финальная отрисовка колеса
    startTime.value = -1; // Сбрасываем время начала анимации
    winningValue.classList.add('win');
    return;
  }
  rotationAngle.value += step.value; // Увеличиваем угол на текущий шаг
  // Ограничиваем угол в пределах от 0 до 2π
  if (rotationAngle.value > 2 * Math.PI) {
    rotationAngle.value -= 2 * Math.PI;
  }
  createWheel(canvasWheel, rotationAngle.value, colors, items); // Рисуем колесо с текущим углом
  updateWinningValue(rotationAngle.value, items, winningValue); // Обновляем текст в элементе winning-value
  // Рекурсивный вызов для следующего кадра
  requestAnimationFrame(() =>
    animate(
      canvasWheel,
      items,
      colors,
      inputElement,
      rotationAngle,
      step,
      startTime,
      winningValue,
    ),
  );
}
