import { createElement } from '../../../utils/createElement';
import '../home.css';

export function createDialogElement() {
  const dialog = createElement<HTMLDialogElement>({
    tag: 'dialog',
    classNames: ['dialog-wrapper'],
  });

  dialog.addEventListener('close', () => {
    dialog.remove();
    document.body.style.overflow = 'auto';
  });

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
      dialog.remove();
      document.body.style.overflow = 'auto';
    }
  });
  return dialog;
}
