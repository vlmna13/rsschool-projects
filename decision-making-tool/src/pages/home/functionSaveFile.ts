import { DecisionState } from '../../utils/functionInit';

export function saveFile() {
  const stringData = localStorage.getItem('decisionState');
  if (!stringData) {
    return;
  }
  const data: DecisionState = JSON.parse(stringData);

  const jsonString = JSON.stringify(data, null, 2); //Преобразуем данные в строку JSON с отступами для удобства чтения.
  const blob = new Blob([jsonString], { type: 'application/json' }); //Создаем объект Blob из строки JSON.
  const url = URL.createObjectURL(blob); //Создаем URL для объекта Blob.
  const anchorElement = document.createElement('a'); //создаем ссылку
  anchorElement.href = url; //устанавливаем href
  anchorElement.download = 'decisionState.json';
  document.body.appendChild(anchorElement);
  anchorElement.click();
  document.body.removeChild(anchorElement);
  URL.revokeObjectURL(url); // освобождаем url
}
