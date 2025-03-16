import { WheelDrawingParams } from './interfaceWheelDrowParams';

export function drawCursor(params: WheelDrawingParams) {
  const { ctx, centerX, centerY, radius } = params;
  const cursorSize = 20;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY - radius + cursorSize); // Верхняя точка треугольника
  ctx.lineTo(centerX - cursorSize / 2, centerY - radius);
  ctx.lineTo(centerX + cursorSize / 2, centerY - radius);
  ctx.closePath();
  ctx.fillStyle = '#fff';
  ctx.fill();
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.stroke();
}
