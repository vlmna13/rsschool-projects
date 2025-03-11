import { createTaskWrapper } from './homeComponents/taskWrapper';
import { DecisionState } from '../../utils/functionInit';
import { TaskWrapperOptions } from './homeComponents/taskWrapper';

export function addItem(taskList: HTMLUListElement) {
  const storedState = localStorage.getItem('decisionState');
  if(!storedState) {
    return;
  }
  const data: DecisionState = JSON.parse(storedState);
  const lastId = data.optionsList.lastId;
  const newTask: TaskWrapperOptions = { id: (lastId +1).toString(), title: '', weight: '' };

  data.optionsList.list[lastId] = newTask;
  data.optionsList.lastId = lastId + 1;
  localStorage.setItem('decisionState', JSON.stringify(data));

  const taskWrapper = createTaskWrapper(newTask);
  taskList.appendChild(taskWrapper);
}
