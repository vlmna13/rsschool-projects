import { DecisionState } from '../../utils/functionInit';
import { router } from '../../utils/router';
import { showMessage } from './functionShowMessage';

export function validateStart() {
  const stringData = localStorage.getItem('decisionState');
  if (!stringData) {
    return;
  }
  const data: DecisionState = JSON.parse(stringData);
  const values = Object.values(data.optionsList.list);
  const validItems = values.filter(
    (item) => item.title && item.weight && Number(item.weight) !== 0,
  );
  if (validItems.length >= 2) {
    router.navigate('wheel');
  } else {
    showMessage();
  }
}
