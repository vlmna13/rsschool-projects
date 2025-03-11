export interface DecisionState {
  optionsList: {
    list: { [id: string]: { id: string; title: string; weight: string } };
    lastId: number;
  };
}

export function initState(): DecisionState {
  const defaultState: DecisionState = {
    optionsList: {
      list: {
        '1': { id: '1', title: '', weight: '' },
      },
      lastId: 1,
    },
  };

  const storedState = localStorage.getItem('decisionState');
  if (!storedState) {
    localStorage.setItem('decisionState', JSON.stringify(defaultState));
    return defaultState;
  } else {
    return JSON.parse(storedState);
  }
}
