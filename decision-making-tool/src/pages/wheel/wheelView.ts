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
  const canvasWheel = createWheel();
  const { controlWrapper, buttonSpin, inputElement, buttonSound } =
    createControlWrapper();
  if (canvasWheel) {
    buttonSpin.addEventListener('click', () => {
      startSpinning(inputElement, canvasWheel, buttonSound);
    });
  }

  contentWrapper.append(controlWrapper);
  contentWrapper.append(winningValue);

  if (canvasWheel) {
    contentWrapper.append(canvasWheel);
  }
  main.append(contentWrapper);
}
