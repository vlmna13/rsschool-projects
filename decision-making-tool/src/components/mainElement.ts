import '../pages/home/home.css';

import { createElement } from '../utils/createElement';

export function createMain(classNames: string[]): HTMLElement {
  const main = createElement<HTMLElement>({
    tag: 'main',
    classNames: classNames,
  });

  return main;
}
