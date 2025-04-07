import { Velocity } from "../../../utils/types";

export function animateCar(
  carImg: HTMLDivElement,
  carImageWrapper: HTMLDivElement,
  data: Velocity,
  onAnimationComplete: () => void, // Колбэк для выполнения после завершения анимации
): { id: number; stop: () => void; time: number } {
  const carWidth = carImg.offsetWidth;
  const trackWidth = carImageWrapper.offsetWidth;
  const maxDistance = data.distance;
  const velocity = data.velocity;
  const duration = maxDistance / velocity;
  const startTime = performance.now();
  const startPosition = 0;
  const endPosition = trackWidth - carWidth;
  let animationFrameId: number | null = null;
  let isStopped = false;

  function step(currentTime: number) {
    if (isStopped) {
      return;
    }

    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);

    const currentPosition =
      startPosition + progress * (endPosition - startPosition);
    carImg.style.left = `${currentPosition}px`;

    if (progress < 1) {
      animationFrameId = requestAnimationFrame(step);
    } else {
      onAnimationComplete();
    }
  }

  animationFrameId = requestAnimationFrame(step);
  return {
    id: animationFrameId,
    stop: () => {
      if (!isStopped) {
        isStopped = true;
        if (animationFrameId !== null) {
          cancelAnimationFrame(animationFrameId);
        }
      }
    },
    time: duration / 1000,
  };
}
