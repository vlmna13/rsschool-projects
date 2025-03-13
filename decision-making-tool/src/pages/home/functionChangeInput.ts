import { DecisionState } from '../../utils/functionInit';

export function whatchInputChange(input: HTMLInputElement): void {
  let dataString = localStorage.getItem('decisionState');
  if (!dataString) {
    return;
  }
  const data: DecisionState = JSON.parse(dataString);
  const idPart = input.id.substring(input.id.lastIndexOf('-') + 1);
  const typePart = input.id.substring(0, input.id.indexOf('-'));

  if (data.optionsList.list[idPart]) {
    if (typePart === 'title') {
      data.optionsList.list[idPart].title = input.value;
    } else if (typePart === 'weight') {
      data.optionsList.list[idPart].weight = input.value;
    }
    localStorage.setItem('decisionState', JSON.stringify(data));
  }
}
