import { Velocity } from "../../../utils/types";

export function animateCar(
  carImg: HTMLDivElement,
  carImageWrapper: HTMLDivElement,
  data: Velocity,
  onAnimationComplete: () => void, // Колбэк для выполнения после завершения анимации
): { id: number; stop: () => void; time: number } {
  const carWidth = carImg.offsetWidth; // Ширина автомобиля
  const trackWidth = carImageWrapper.offsetWidth; // Ширина трека
  const maxDistance = data.distance; // Время в миллисекундах, которое нужно разделить на скорость
  const velocity = data.velocity; // Скорость автомобиля (например, пиксели в секунду)
  const duration = maxDistance / velocity; // Время анимации в миллисекундах
  const startTime = performance.now(); // Время начала анимации
  const startPosition = 0; // Начальная позиция автомобиля
  const endPosition = trackWidth - carWidth; // Конечная позиция автомобиля
  let animationFrameId: number | null = null; // ID текущей анимации
  let isStopped = false; // Флаг для остановки анимации

  function step(currentTime: number) {
    if (isStopped) {
      return; // Если анимация остановлена, выходим из функции
    }

    const elapsedTime = currentTime - startTime; // Время, прошедшее с начала анимации (в миллисекундах)
    const progress = Math.min(elapsedTime / duration, 1); // Прогресс анимации (от 0 до 1)

    const currentPosition =
      startPosition + progress * (endPosition - startPosition); // Текущая позиция автомобиля
    carImg.style.left = `${currentPosition}px`; // Перемещаем автомобиль

    if (progress < 1) {
      animationFrameId = requestAnimationFrame(step); // Продолжаем анимацию
    } else {
      onAnimationComplete(); // Вызываем колбэк при завершении анимации
    }
  }

  animationFrameId = requestAnimationFrame(step); // Запускаем анимацию
  return {
    id: animationFrameId,
    stop: () => {
      if (!isStopped) {
        isStopped = true; // Устанавливаем флаг остановки
        if (animationFrameId !== null) {
          cancelAnimationFrame(animationFrameId); // Отменяем текущую анимацию
        }
      }
    },
    time: duration / 1000, // Возвращаем время анимации в секундах
  };
}
