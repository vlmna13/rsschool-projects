import './wheelView.css';
import { createElement } from '../../utils/createElement';
import { createControlWrapper } from './functionCreateControlWrapper';
import { createWheel } from './wheelComponents/createWheel';
import { startSpinning } from './functionStartSpinning';

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
  const winningValue = createElement({
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
  createWheel(canvasWheel, 0);
  const { controlWrapper, buttonSpin, inputElement } = createControlWrapper();
  buttonSpin.addEventListener('click', () => {
    startSpinning(inputElement, canvasWheel);
  });
  contentWrapper.append(controlWrapper);
  contentWrapper.append(winningValue);
  if (canvasWheel) {
    contentWrapper.append(canvasWheel);
  }
  main.append(contentWrapper);
}
