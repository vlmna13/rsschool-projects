import { DecisionState } from '../../utils/functionInit';
import { router } from '../../utils/router';
import { showMessage } from './functionShowMessage';
import { TaskWrapperOptions } from './homeComponents/taskWrapper';

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
  }
  return validItems;
}

export function transitionToWheel() {
  const data: TaskWrapperOptions[] = validateStart();
  if (!data) {
    showMessage();
  } else if (data.length < 2) {
    showMessage();
  } else {
    router.navigate('wheel');
  }
}
