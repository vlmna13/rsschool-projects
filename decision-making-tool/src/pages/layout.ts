import { createHeader } from '../components/header';
import { createMain } from '../components/mainElement';

export function createLayout(classNames: string[]) {
  const main = createMain(classNames);
  const header = createHeader();
  main.appendChild(header);
  document.body.appendChild(main);
  return main;
}
