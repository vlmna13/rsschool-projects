import { WheelDrawingParams } from './interfaceWheelDrowParams';

export function drawCenterElement(params: WheelDrawingParams) {
  const { ctx, centerX, centerY, radius } = params;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius * 0.1, 0, 2 * Math.PI);
  ctx.fillStyle = '#fff';
  ctx.fill();
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.stroke();
}
