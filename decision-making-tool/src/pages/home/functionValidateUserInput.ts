import { DecisionState } from '../../utils/functionInit';

export function validateUserInput(value: string) {
  const itemsList = value.split('\n');
  const storedState = localStorage.getItem('decisionState');
  let defaultState: DecisionState;

  if (storedState) {
    defaultState = JSON.parse(storedState);
  } else {
    defaultState = {
      optionsList: {
        list: {},
        lastId: 0,
      },
    };
  }
  const newItems = itemsList.map((item) => {
    let lastComa = item.lastIndexOf(',');
    let title = item.substring(0, lastComa).trim();
    let weight = item.substring(lastComa + 1).trim();

    if (!title) {
      title = '';
    }

    if (!weight || isNaN(Number(weight))) {
      weight = '';
    }

    const newId = `${defaultState.optionsList.lastId + 1}`;
    defaultState.optionsList.lastId += 1;

    return {
      id: newId,
      title: title,
      weight: weight,
    };
  });
  newItems.forEach((item) => {
    defaultState.optionsList.list[item.id] = item;
  });
  localStorage.setItem('decisionState', JSON.stringify(defaultState));

  return newItems;
}
