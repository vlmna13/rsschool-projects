export interface WheelDrawingParams {
  ctx: CanvasRenderingContext2D; // Контекст рисования
  centerX: number; // Координата X центра колеса
  centerY: number; // Координата Y центра колеса
  radius: number; // Радиус колеса
}

export interface SectionDrawingParams extends WheelDrawingParams {
  startAngle: number; // Начальный угол секции
  angle: number; // Угол секции
  color: string; // Цвет секции
}

export interface TextDrawingParams extends WheelDrawingParams {
  startAngle: number; // Начальный угол секции
  angle: number; // Угол секции
  text: string; // Текст для отображения
}
