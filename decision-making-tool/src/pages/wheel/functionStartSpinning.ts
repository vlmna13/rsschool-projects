import { checkDuration } from './functionCheckDuration';
import { playPauseAudio } from './functionPlayAudio';
import { toggleSound } from './functionToggleSound';

export function startSpinning(
  inputDuration: HTMLInputElement,
  canvasElement: HTMLCanvasElement,
  buttonSound: HTMLButtonElement,
): void {
  // Проверяем длительность вращения
  const duration = checkDuration(inputDuration);
  const totalRotations = 5; // Минимум 5 полных оборотов
  const randomOffset = Math.random() * 360; // Случайная конечная позиция
  const totalAngle = totalRotations * 360 + randomOffset; // Общий угол вращения
  const muteState = toggleSound(buttonSound); // Проверяем состояние звука

  // Воспроизводим звук вращения
  playPauseAudio(duration, !muteState);

  // Устанавливаем начальное состояние для анимации
  canvasElement.style.transition = `transform ${duration}s ease-in-out`;
  canvasElement.style.transform = `rotate(${totalAngle}deg)`;

  // После завершения вращения воспроизводим звук победы
  setTimeout(() => {
    if (!muteState) {
      const winAudio = new Audio('src/pages/wheel/assets/win.mp3');
      winAudio.play();
    }
  }, duration * 1000);
}
