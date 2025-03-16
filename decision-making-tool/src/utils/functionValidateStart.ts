import { DecisionState } from './functionInit';
import { TaskWrapperOptions } from '../pages/home/homeComponents/taskWrapper';

export function validateStart(): TaskWrapperOptions[] {
  const stringData = localStorage.getItem('decisionState');
  if (!stringData) {
    return [];
  }
  const data: DecisionState = JSON.parse(stringData);
  const values = Object.values(data.optionsList.list);
  let validItems = values.filter(
    (item) => item.title && item.weight && Number(item.weight) !== 0,
  );
  if (validItems.length === 0) {
    validItems = [];
  };
  return validItems;
}
