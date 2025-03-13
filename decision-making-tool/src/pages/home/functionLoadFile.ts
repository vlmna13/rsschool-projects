import { createElement } from '../../utils/createElement';
import { DecisionState } from '../../utils/functionInit';
import { clearList } from './functionClearList';
import { createTaskWrapper } from './homeComponents/taskWrapper';

export function loadFile(taskWrapper: HTMLUListElement): void {
  //создаем инпут с типом файл
  const input = createElement<HTMLInputElement>({
    tag: 'input',
  });
  input.type = 'file';
  input.accept = 'application/json'; // Устанавливаем, что принимаются только файлы формата JSON
  // Добавляем обработчик события change, который срабатывает при выборе файла
  input.addEventListener('change', (event) => {
    const target = event.target;
    // Проверяем, что target является элементом HTMLInputElement и содержит файлы
    if (target instanceof HTMLInputElement && target.files) {
      const file = target.files[0]; // Получаем первый выбранный файл
      if (file) {
        const reader = new FileReader(); // Создаем объект FileReader для чтения файла
        reader.onload = (e) => {
          // Проверяем, что результат чтения существует и является строкой
          if (e.target && typeof e.target.result === 'string') {
            try {
              const jsonData: DecisionState = JSON.parse(e.target.result); // Парсим JSON из строки
              // Очищаем предыдущие данные в localStorage
              clearList(taskWrapper);
              localStorage.removeItem('decisionState');
              localStorage.setItem('decisionState', JSON.stringify(jsonData));

              Object.values(jsonData.optionsList.list).forEach((task) => {
                const taskWrapperElement = createTaskWrapper(task);
                taskWrapper.appendChild(taskWrapperElement);
              });
            } catch (error) {
              console.error('Error parsing JSON:', error); // Обрабатываем ошибку парсинга JSON
            }
          } else {
            console.error('File reading error'); // Обрабатываем ошибку чтения файла
          }
        };
        reader.readAsText(file); // Читаем содержимое файла как текст
      }
    }
  });

  input.click(); // Инициируем выбор файла
}
