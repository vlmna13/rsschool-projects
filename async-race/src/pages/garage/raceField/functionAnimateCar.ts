import { Velocity } from "../../../utils/types";

export function animateCar(
  carImg: HTMLDivElement,
  carImageWrapper: HTMLDivElement,
  data: Velocity,
  onAnimationComplete: () => void, // Колбэк для выполнения после завершения анимации
): void {
  const carWidth = carImg.offsetWidth; // Ширина автомобиля
  const trackWidth = carImageWrapper.offsetWidth; // Ширина трека

  const maxDistance = data.distance; // Максимальная дистанция, которую должен проехать автомобиль
  const velocity = data.velocity; // Скорость автомобиля (например, пиксели в секунду)

  // Масштабируем дистанцию до ширины трека
  const scaledDistance = Math.min(maxDistance, trackWidth - carWidth);

  const duration = (scaledDistance / velocity) * 1000; // Время анимации в миллисекундах
  const startTime = performance.now(); // Время начала анимации

  const startPosition = 0; // Начальная позиция автомобиля
  const endPosition = trackWidth - carWidth; // Конечная позиция автомобиля

  function step(currentTime: number) {
    const elapsedTime = currentTime - startTime; // Время, прошедшее с начала анимации (в миллисекундах)
    const progress = Math.min(elapsedTime / duration, 1); // Прогресс анимации (от 0 до 1)

    const currentPosition =
      startPosition + progress * (endPosition - startPosition); // Текущая позиция автомобиля
    carImg.style.left = `${currentPosition}px`; // Перемещаем автомобиль

    if (progress < 1) {
      requestAnimationFrame(step); // Продолжаем анимацию
    } else {
      onAnimationComplete();
    }
  }

  requestAnimationFrame(step); // Запускаем анимацию
}
