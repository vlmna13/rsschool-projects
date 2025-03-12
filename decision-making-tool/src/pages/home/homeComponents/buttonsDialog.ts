import { createElement } from '../../../utils/createElement';
import '../home.css';
import '../../../components/componentsStyles.css';

export function createButtonClose(dialog: HTMLDialogElement) {
  const buttonCancel = createElement<HTMLButtonElement>({
    tag: 'button',
    classNames: ['button', 'button-cancel'],
    textContent: 'Cancel',
  });
  buttonCancel.type = 'button';
  buttonCancel.addEventListener('click', () => {
    dialog.close();
    dialog.remove();
  });
  return buttonCancel;
}

export function createButtonConfirm() {
  const buttonConfirm = createElement<HTMLButtonElement>({
    tag: 'button',
    classNames: ['button', 'button-confirm'],
    textContent: 'Confirm',
  });
  buttonConfirm.type = 'submit';
  return buttonConfirm;
}
