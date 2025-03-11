import { DecisionState } from '../../utils/functionInit';

export function clearList(taskList: HTMLUListElement) {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  const stringData = localStorage.getItem('decisionState');
  if (stringData) {
    const data: DecisionState = JSON.parse(stringData);
    data.optionsList.list = {};
    data.optionsList.lastId = 0;
    localStorage.setItem('decisionState', JSON.stringify(data));
  }
}
