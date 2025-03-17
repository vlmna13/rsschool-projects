import '../../components/componentsStyles.css';
import { createHeader } from '../../components/header';
import { createButtonBack } from '../wheel/wheelComponents/controlsButton';

export function errorView(main: HTMLElement) {
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
  main.classList.remove('main-wheel-container');
  main.classList.remove('main-home-container');
  main.classList.add('main-wheel-container');
  let header = createHeader();
  header.textContent = '404 Page Not Found';
  const buttonBack = createButtonBack();
  main.append(header, buttonBack);
}
