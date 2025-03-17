import { TaskWrapperOptions } from '../home/homeComponents/taskWrapper';
import { normalizeAngle } from './wheelComponents/createWheel';

export function updateWinningValue(
  rotationAngle: number,
  items: TaskWrapperOptions[],
  winValue: HTMLParagraphElement,
) {
  // Вычисляем общий вес всех элементов
  const totalWeight = items.reduce((sum, item) => sum + Number(item.weight), 0);

  // Нормализуем начальный угол и угол указателя
  let startAngle = normalizeAngle(rotationAngle); // Угол начала сектора
  const pointerAngle = normalizeAngle(-Math.PI / 2); // Указатель направлен вверх

  // Проходим по всем элементам и определяем, на какой из них указывает указатель
  items.forEach((item) => {
    const weight = Number(item.weight);
    const angle = (weight / totalWeight) * 2 * Math.PI; // Угол секции
    const endAngle = normalizeAngle(startAngle + angle); // Угол конца секции
    // Проверяем, попадает ли указатель в текущую секцию
    if (
      (pointerAngle >= startAngle && pointerAngle < endAngle) || // Обычный случай
      (endAngle < startAngle && // Случай пересечения 0 градусов
        (pointerAngle >= startAngle || pointerAngle < endAngle))
    ) {
      // Обновляем текст в winValue
      winValue.textContent = item.title;
    }

    // Обновляем угол начала для следующей секции
    startAngle = endAngle;
  });
}
