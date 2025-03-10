import { createElement } from '../utils/createElement';
import './componentsStyles.css';

export function deleteItem(element: HTMLButtonElement, event: Event): void {
  console.log('delete');
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
