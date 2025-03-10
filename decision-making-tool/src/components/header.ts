import { createElement } from '../utils/createElement';

export function createHeader(): HTMLElement {
  const header = createElement({
    tag: 'h1',
    classNames: ['header'],
    textContent: 'Decision Making Tool',
  });
  return header;
}
