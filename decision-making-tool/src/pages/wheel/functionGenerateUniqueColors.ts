export function generateUniqueColors(count: number): string[] {
  const colors = new Set<string>();
  while (colors.size < count) {
    const hue = Math.floor(Math.random() * 360); // Генерируем случайный оттенок
    const color = `hsl(${hue}, 70%, 70%)`;
    colors.add(color); // Добавляем цвет в Set (гарантирует уникальность)
  }
  return Array.from(colors); // Преобразуем Set в массив
}
