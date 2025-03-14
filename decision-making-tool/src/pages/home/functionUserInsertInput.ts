import { validateUserInput } from './functionValidateUserInput';
import { createTaskWrapper } from './homeComponents/taskWrapper';

export function userInsertInput(
  taskList: HTMLUListElement,
  textareaElement: HTMLTextAreaElement,
) {
  const defaultState = validateUserInput(textareaElement.value);
  if (!defaultState) {
    return;
  }
  defaultState.forEach((el) => {
    let task = createTaskWrapper(el);
    taskList.appendChild(task);
  });
}
