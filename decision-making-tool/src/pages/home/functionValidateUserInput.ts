import { DecisionState } from '../../utils/functionInit';

export function validateUserInput(value: string) {
  if (value.length === 0) {
    return [];
  }
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
  const newItems = itemsList
    .map((item) => {
      if (!item.includes(',')) {
        return undefined; // Пропускаем строку, если запятых нет
      }
      const lastComa = item.lastIndexOf(',');
      const title = item.substring(0, lastComa).trim();
      const weightPart = item.substring(lastComa + 1).trim();
      if (weightPart && isNaN(Number(weightPart))) {
        return undefined; // Пропускаем строку, если weight не является числом
      }
      const weight = weightPart || ''; // Если weightPart пустой, оставляем weight пустым
      const newId = `${defaultState.optionsList.lastId + 1}`;
      defaultState.optionsList.lastId += 1;
      return {
        id: newId,
        title: title,
        weight: weight,
      };
    })
    .filter((item) => item !== undefined); // Убираем строки, которые были пропущены
  newItems.forEach((item) => {
    if (item) {
      defaultState.optionsList.list[item.id] = item;
    }
  });

  localStorage.setItem('decisionState', JSON.stringify(defaultState));

  return newItems; // Возвращаем массив новых элементов
}
