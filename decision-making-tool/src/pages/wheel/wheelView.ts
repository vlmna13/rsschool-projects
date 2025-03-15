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
  main.appendChild(contentWrapper);
  const controlWrapper = createControlWrapper();
  contentWrapper.append(controlWrapper);
}
