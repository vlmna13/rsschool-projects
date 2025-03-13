import { createElement } from '../../../utils/createElement';
import '../home.css';
import '../../../components/componentsStyles.css';

export function createButtonDelete(): HTMLButtonElement {
  const buttonDelete = createElement<HTMLButtonElement>({
    tag: 'button',
    classNames: ['button', 'button-delete'],
    textContent: 'Delete',
  });
  return buttonDelete;
}

export function createButtonAdd(): HTMLButtonElement {
  const buttonAdd = createElement<HTMLButtonElement>({
    tag: 'button',
    classNames: ['button', 'button-add'],
    textContent: 'Add Option',
  });
  return buttonAdd;
}

export function createButtonInsert(): HTMLButtonElement {
  const buttonInsert = createElement<HTMLButtonElement>({
    tag: 'button',
    classNames: ['button', 'button-insert'],
    textContent: 'Past List',
  });
  return buttonInsert;
}

export function createButtonClear(): HTMLButtonElement {
  const buttonClear = createElement<HTMLButtonElement>({
    tag: 'button',
    classNames: ['button', 'button-clear'],
    textContent: 'Clear',
  });
  return buttonClear;
}
