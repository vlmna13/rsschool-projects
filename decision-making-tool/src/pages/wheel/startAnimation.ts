import { TaskWrapperOptions } from '../home/homeComponents/taskWrapper';
import { animate } from './animationUtil';

export function startAnimation(
  canvasWheel: HTMLCanvasElement,
  items: TaskWrapperOptions[],
  colors: string[],
  inputElement: HTMLInputElement,
) {
  // Сбрасываем значения переменных
  const rotationAngle = { value: 0 }; // Текущий угол вращения
  const step = { value: 0.01 }; // Начальная скорость вращения
  const startTime = { value: null as number | null }; // Время начала анимации

  // Запускаем анимацию
  animate(canvasWheel, items, colors, inputElement, rotationAngle, step, startTime);
}