import { validateUserInput } from './functionValidateUserInput';
import { createTaskWrapper } from './homeComponents/taskWrapper';

export function userInsertInput(
  taskList: HTMLUListElement,
  textareaElement: HTMLTextAreaElement,
  dialogWrapper: HTMLDialogElement,
) {
  const defaultState = validateUserInput(textareaElement.value);
  if (!defaultState || defaultState.length === 0) {
    dialogWrapper.close();
    return;
  }
  defaultState.forEach((el) => {
    let task = createTaskWrapper(el);
    taskList.appendChild(task);
  });
  dialogWrapper.close();
}
