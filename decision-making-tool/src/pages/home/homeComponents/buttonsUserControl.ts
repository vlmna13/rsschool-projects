import { createElement } from '../../../utils/createElement';
import '../home.css';
import '../../../components/componentsStyles.css';

export function createSaveFileButton(): HTMLButtonElement {
  const buttonSave = createElement<HTMLButtonElement>({
    tag: 'button',
    classNames: ['button', 'button-save'],
    textContent: 'Save list to file',
  });
  return buttonSave;
}

export function createLoadFileButton() {
  const buttonLoad = createElement<HTMLButtonElement>({
    tag: 'button',
    classNames: ['button', 'button-load'],
    textContent: 'Load list from file',
  });
  return buttonLoad;
}
