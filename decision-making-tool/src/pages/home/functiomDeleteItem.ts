import { DecisionState } from "../../utils/functionInit";

export function deleteItem(element: HTMLLIElement): void {
    const stringData = localStorage.getItem('decisionState');
    if (!stringData) {
      return;
    }
    const data: DecisionState = JSON.parse(stringData);
    const id = element.dataset.index;

    if(id && data.optionsList.list[id]) {
        delete data.optionsList.list[id];
        localStorage.setItem('decisionState', JSON.stringify(data));
        element.remove();
    }
}