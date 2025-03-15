import './wheelView.css';
import { createElement } from '../../utils/createElement';
import { createControlWrapper } from './functionCreateControlWrapper';

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
  main.append(contentWrapper, winningValue);
  const controlWrapper = createControlWrapper();
  contentWrapper.append(controlWrapper);
}
