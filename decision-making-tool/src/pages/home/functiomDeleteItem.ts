import { DecisionState } from '../../utils/functionInit';

export function deleteItem(element: HTMLLIElement): void {
  const stringData = localStorage.getItem('decisionState');
  if (!stringData) {
    return;
  }
  const data: DecisionState = JSON.parse(stringData);
  const id = element.dataset.index;

  if (id && data.optionsList.list[id]) {
    delete data.optionsList.list[id];
    element.remove();
  }
  if (Object.keys(data.optionsList.list).length === 0) {
    data.optionsList.lastId = 0;
  }
  localStorage.setItem('decisionState', JSON.stringify(data));
}
