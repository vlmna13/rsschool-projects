import { TaskWrapperOptions } from '../../home/homeComponents/taskWrapper';
import { drawSection } from './canvasElement/functionDrawSection';
import { drawText } from './canvasElement/functionDrawText';
import { drawCenterElement } from './canvasElement/functionDrowCenterElement';
import { drawCursor } from './canvasElement/functionDrowCursor';
export function normalizeAngle(angle: number): number {
  return (angle + 2 * Math.PI) % (2 * Math.PI);
}
export function createWheel(
  canvasWheel: HTMLCanvasElement,
  rotationAngle: number = 0,
  colors: string[],
  items: TaskWrapperOptions[],
) {
  const ctx = canvasWheel.getContext('2d');
  if (!ctx) {
    return;
  }
  // Настройки колеса
  const width = canvasWheel.width;
  const height = canvasWheel.height;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2; // Радиус колеса
  const totalWeight = items.reduce((sum, item) => sum + Number(item.weight), 0);
  let startAngle = normalizeAngle(rotationAngle); // Угол начала сектора

  items.forEach((item, index) => {
    const weight = Number(item.weight);
    const angle = (weight / totalWeight) * 2 * Math.PI; // Угол секции
    const endAngle = normalizeAngle(startAngle + angle); // Угол конца секции
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
    startAngle = endAngle; // Обновляем угол начала для следующей секции
  });
  drawCenterElement({ ctx, centerX, centerY, radius });
  drawCursor({ ctx, centerX, centerY, radius });
  return canvasWheel;
}
