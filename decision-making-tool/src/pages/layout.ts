import { createHeader } from '../components/header';
import { createMain } from '../components/mainElement';

export function createLayout() {
  const main = createMain();
  const header = createHeader();
  main.appendChild(header);
  return main;
}
