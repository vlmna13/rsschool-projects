import './wheelView.css';
import { createElement } from '../../utils/createElement';
import { createControlWrapper } from './functionCreateControlWrapper';
import { createWheel } from './wheelComponents/createWheel';
import { validateStart } from '../home/functionTransitionToWheel';
import { generateUniqueColors } from './functionGenerateUniqueColors';
import { startAnimation } from './startAnimation';

export function wheelView(main: HTMLElement) {
  while (main.children.length > 1) {
    main.removeChild(main.lastChild!);
  }
  main.classList.remove('main-home-container');
  main.className = 'main-wheel-container';
  const contentWrapper = createElement({
    tag: 'div',
    classNames: ['content-wrapper'],
  });
  const winningValue = createElement<HTMLParagraphElement>({
    tag: 'p',
    classNames: ['winning-value'],
    textContent: 'PRESS START TO SPIN THE WHEEL',
  });
  const canvasWheel = createElement<HTMLCanvasElement>({
    tag: 'canvas',
    classNames: ['canvas-wheel'],
  });
  canvasWheel.width = 512;
  canvasWheel.height = 512;
  const items = validateStart().sort(() => Math.random() - 0.5);
  const colors = generateUniqueColors(items.length);
  const wheelData = createWheel(canvasWheel, 0, colors, items);
  if (!wheelData) {
    return; // Завершаем выполнение, если createWheel вернул undefined
  }
  const { controlWrapper, buttonSpin, inputElement } = createControlWrapper();
  buttonSpin.addEventListener('click', () => {
    // startSpinning(inputElement, canvasWheel, items, colors);
    startAnimation(canvasWheel, items, colors, inputElement, winningValue, controlWrapper);
  });
  contentWrapper.append(controlWrapper);
  contentWrapper.append(winningValue);
  if (canvasWheel) {
    contentWrapper.append(canvasWheel);
  }
  main.append(contentWrapper);
}
