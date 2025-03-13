import { createTaskWrapper } from './homeComponents/taskWrapper';
import { DecisionState } from '../../utils/functionInit';
import { TaskWrapperOptions } from './homeComponents/taskWrapper';

export function addItem(taskList: HTMLUListElement) {
  const storedState = localStorage.getItem('decisionState');
  if (!storedState) {
    return;
  }
  const data: DecisionState = JSON.parse(storedState);
  const newId = data.optionsList.lastId + 1;
  const newTask: TaskWrapperOptions = {
    id: newId.toString(),
    title: '',
    weight: '',
  };

  data.optionsList.list[newTask.id] = newTask;
  data.optionsList.lastId = newId;
  localStorage.setItem('decisionState', JSON.stringify(data));

  const taskWrapper = createTaskWrapper(newTask);
  taskList.appendChild(taskWrapper);
}
