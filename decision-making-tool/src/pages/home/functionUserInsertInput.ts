import { validateUserInput } from './functionValidateUserInput';
import { createTaskWrapper } from './homeComponents/taskWrapper';

export function userInsertInput(
  taskList: HTMLUListElement,
  textareaElement: HTMLTextAreaElement,
) {
  const defaultState = validateUserInput(textareaElement.value);
  console.log(defaultState);
  defaultState.forEach((el) => {
    let task = createTaskWrapper(el);
    taskList.appendChild(task);
  });
}
