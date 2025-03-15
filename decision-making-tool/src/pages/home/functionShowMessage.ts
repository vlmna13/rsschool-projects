import './home.css';
import { createElement } from '../../utils/createElement';
import { createDialogElement } from './homeComponents/dialogWrapper';
import { createButtonClose } from './homeComponents/buttonsDialog';

export function showMessage() {
  const dialog = createDialogElement();
  document.body.appendChild(dialog);
  const messageWrapper = createElement({
    tag: 'div',
    classNames: ['message-wrapper'],
  });
  dialog.appendChild(messageWrapper);
  const message = createElement({
    tag: 'p',
    classNames: ['message'],
  });
  message.textContent =
    'Please add at least 2 valid options.\n\nAn option is considered valid if its title is not empty and its weight is greater than 0.';
  const buttonClose = createButtonClose(dialog);
  messageWrapper.append(message, buttonClose);
  dialog.showModal();
}
