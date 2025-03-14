import '../pages/home/home.css';
import { createElement } from '../utils/createElement';

export function createMain(): HTMLElement {
  const main = createElement<HTMLElement>({
    tag: 'main',
    classNames: ['main-container'],
  });

  return main;
}
