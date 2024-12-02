export function creator(element, className, parent) {
    // Создаем новый элемент с заданным тегом
    const newElement = document.createElement(element);

    // Добавляем класс к новому элементу
    newElement.className = className;

    // Вставляем элемент в родительский элемент
    let parentEl= document.querySelector(parent);
    parent.appendChild(newElement);
}