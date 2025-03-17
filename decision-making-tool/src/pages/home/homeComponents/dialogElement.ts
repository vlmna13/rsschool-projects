import { createElement } from '../../../utils/createElement';
import '../home.css';

export function createDialogElement() {
  const dialog = createElement<HTMLDialogElement>({
    tag: 'dialog',
    classNames: ['dialog-wrapper'],
  });

  dialog.addEventListener('close', () => {
    dialog.remove();
  });

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
      dialog.remove();
    }
  });
  return dialog;
}
