import { createElement } from '../../../utils/createElement';
import '../home.css';
import '../../../components/componentsStyles.css';
import { createButtonClose, createButtonConfirm } from './buttonsDialog';

export function createDialog(): HTMLDialogElement {
  const dialog = createElement<HTMLDialogElement>({
    tag: 'dialog',
    classNames: ['dialog-wrapper'],
  });

  dialog.addEventListener('close', () => {
    dialog.remove();
    document.body.style.overflow = 'auto';
  });

  dialog.addEventListener('click', () => {
    dialog.remove();
    document.body.style.overflow = 'auto';
  })

  const form = createElement<HTMLFormElement>({
    tag: 'form',
    classNames: ['form-element'],
  });
  dialog.appendChild(form);

  const textareaElement = createElement<HTMLTextAreaElement>({
    tag: 'textarea',
    classNames: ['textarea-element'],
  });
  textareaElement.placeholder = `Paste a list of new options in a CSV-like format:

  title,1                 -> | title                 | 1 |
  title with whitespace,2 -> | title with whitespace | 2 |
  title , with , commas,3 -> | title , with , commas | 3 |
  title with "quotes",4   -> | title with "quotes"   | 4 |`;
  textareaElement.rows = 12;
  textareaElement.cols = 64;
  form.appendChild(textareaElement);

  const buttonCancel = createButtonClose(dialog);

  form.appendChild(buttonCancel);
  document.body.style.overflow = 'hidden';
  const buttonConfirm = createButtonConfirm();
  form.appendChild(buttonConfirm);
  document.body.appendChild(dialog);
  dialog.showModal();
  return dialog;
}
