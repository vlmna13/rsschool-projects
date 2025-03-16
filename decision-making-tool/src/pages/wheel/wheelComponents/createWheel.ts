import { validateStart } from '../../home/functionTransitionToWheel';
import { generateUniqueColors } from '../functionGenerateUniqueColors';
import { drawSection } from './canvasElement/functionDrawSection';
import { drawText } from './canvasElement/functionDrawText';
import { drawCenterElement } from './canvasElement/functionDrowCenterElement';
import { drawCursor } from './canvasElement/functionDrowCursor';

export function createWheel(canvasWheel: HTMLCanvasElement, rotationAngle: number = 0) {
  let items = validateStart();
  const ctx = canvasWheel.getContext('2d');
  if (!ctx) {
    return;
  }
  // Настройки колеса
  const width = canvasWheel.width;
  const height = canvasWheel.height;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 20; // Радиус колеса
  const totalWeight = items.reduce((sum, item) => sum + Number(item.weight), 0);
  const shuffledItems = [...items].sort(() => Math.random() - 0.5);
  // Генерируем уникальные цвета для каждой секции
  const colors = generateUniqueColors(shuffledItems.length);
  let startAngle = rotationAngle; // Угол начала сектора
  shuffledItems.forEach((item, index) => {
    const weight = Number(item.weight);
    const angle = (weight / totalWeight) * 2 * Math.PI; // Угол секции
    // Рисуем секцию
    drawSection({
      ctx,
      centerX,
      centerY,
      radius,
      startAngle,
      angle,
      color: colors[index],
    });
    // Рисуем текст
    drawText({
      ctx,
      centerX,
      centerY,
      radius,
      startAngle,
      angle,
      text: item.title,
    });
    startAngle += angle; // Обновляем угол начала для следующей секции
  });
  // Рисуем центральный декоративный элемент
  drawCenterElement({ ctx, centerX, centerY, radius });
  // Рисуем указатель (курсор)
  drawCursor({ ctx, centerX, centerY, radius });
  return canvasWheel;
}
