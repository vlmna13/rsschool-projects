import './wheelView.css';
import { createElement } from '../../utils/createElement';
import { createControlWrapper } from './functionCreateControlWrapper';
import { createWheel } from './wheelComponents/createWheel';

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
  const controlWrapper = createControlWrapper();
  contentWrapper.append(controlWrapper);
  contentWrapper.append(winningValue);
  const canvasWheel = createWheel();
  if (canvasWheel) {
    contentWrapper.append(canvasWheel);
  }
  main.append(contentWrapper);
}
