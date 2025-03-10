import { createElement } from '../../utils/createElement';
import './home.css';
import '../../components/componentsStyles.css';
import { addItem } from './functionAddItem';

export function pastList() {}

export function clearList() {}

export function deleteItem(element: HTMLButtonElement, event: Event): void {
  console.log();
}

export function createButtonDelete(): HTMLButtonElement {
  const buttonDelete = createElement<HTMLButtonElement>({
    tag: 'button',
    classNames: ['button', 'button-delete'],
    textContent: 'Delete',
    events: {
      click: deleteItem,
    },
  });
  return buttonDelete;
}

export function createButtonAdd(): HTMLButtonElement {
  const buttonAdd = createElement<HTMLButtonElement>({
    tag: 'button',
    classNames: ['button', 'button-add'],
    textContent: 'Add Option',
    events: {
      click: addItem,
    },
  });
  return buttonAdd;
}

export function createButtonInsert(): HTMLButtonElement {
  const buttonInsert = createElement<HTMLButtonElement>({
    tag: 'button',
    classNames: ['button', 'button-insert'],
    textContent: 'Past List',
    events: {
      click: pastList,
    },
  });
  return buttonInsert;
}

export function createButtonClear(): HTMLButtonElement {
  const buttonClear = createElement<HTMLButtonElement>({
    tag: 'button',
    classNames: ['button', 'button-clear'],
    textContent: 'Clear',
    events: {
      click: clearList,
    },
  });
  return buttonClear;
}
