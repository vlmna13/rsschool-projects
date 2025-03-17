import { TaskWrapperOptions } from '../home/homeComponents/taskWrapper';

export function updateWinningValue(
  rotationAngle: number,
  items: TaskWrapperOptions[],
  winValue: HTMLParagraphElement,
) {
  const totalItems = items.length;
  const anglePerItem = (2 * Math.PI) / totalItems; // Угол, занимаемый одним элементом
  const adjustedAngle = (rotationAngle + Math.PI / 2) % (2 * Math.PI); // Корректируем угол для указателя (курсор сверху)

  // Определяем индекс текущего элемента
  const currentIndex = Math.floor(adjustedAngle / anglePerItem) % totalItems;

  // Обновляем текст в элементе winning-value
  winValue.textContent = items[currentIndex].title;
}
