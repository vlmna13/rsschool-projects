import { TaskWrapperOptions } from '../home/homeComponents/taskWrapper';
import { animate } from './animationUtil';

export function startAnimation(
  canvasWheel: HTMLCanvasElement,
  items: TaskWrapperOptions[],
  colors: string[],
  inputElement: HTMLInputElement,
  winValue: HTMLParagraphElement,
  controlWrapper: HTMLDivElement,
) {
  const rotationAngle = { value: 0 }; // Текущий угол вращения
  const step = { value: 0.01 }; // Начальная скорость вращения
  const startTime = { value: -1 }; // Время начала анимации
  const controls = controlWrapper.querySelectorAll<HTMLElement>('*');
  controls.forEach((control) => {
    if (
      control instanceof HTMLButtonElement ||
      control instanceof HTMLInputElement
    ) {
      control.disabled = true;
      control.style.backgroundColor = 'gray';
    }
  });
  animate(
    canvasWheel,
    items,
    colors,
    inputElement,
    rotationAngle,
    step,
    startTime,
    winValue,
    controlWrapper,
  );
  setTimeout(
    () => {
      controls.forEach((control) => {
        if (
          control instanceof HTMLButtonElement ||
          control instanceof HTMLInputElement
        ) {
          control.disabled = false;
          control.style.backgroundColor = '';
        }
      });
    },
    Number(inputElement.value) * 1000,
  ); // Длительность анимации
}
