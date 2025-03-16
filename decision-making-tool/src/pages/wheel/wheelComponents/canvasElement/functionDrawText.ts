import { TextDrawingParams } from './interfaceWheelDrowParams';

export function drawText(params: TextDrawingParams) {
  const { ctx, centerX, centerY, radius, startAngle, angle, text } = params;
  const textAngle = startAngle + angle / 2; // Угол для текста
  const textRadius = radius * 0.7; // Радиус для текста
  ctx.save();
  ctx.translate(
    centerX + Math.cos(textAngle) * textRadius,
    centerY + Math.sin(textAngle) * textRadius,
  );
  ctx.rotate(textAngle);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#000';
  ctx.font = '16px Arial';

  const maxTextLength = 15; // Обрезаем текст, если он слишком длинный
  const displayText =
    text.length > maxTextLength
      ? text.substring(0, maxTextLength - 1) + '…'
      : text;

  ctx.fillText(displayText, 0, 0);
  ctx.restore();
}
