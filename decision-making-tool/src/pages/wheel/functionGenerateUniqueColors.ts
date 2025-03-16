export function generateUniqueColors(count: number): string[] {
  const colors = new Set<string>();
  const hueShift = Math.floor(Math.random() * 360); // Случайное смещение для разнообразия цветов
  for (let i = 0; i < count; i++) {
    const hue = (i * (360 / count) + hueShift) % 360; // Равномерное распределение с учётом смещения
    const color = `hsl(${hue}, 70%, 50%)`; // Используем насыщенность 70% и яркость 50% для контраста
    colors.add(color);
  }
  return Array.from(colors); // Преобразуем Set в массив
}
