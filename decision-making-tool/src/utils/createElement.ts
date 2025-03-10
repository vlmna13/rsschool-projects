export interface ElementOptions<T extends HTMLElement> {
  tag: string;
  classNames?: string[];
  textContent?: string;
  events?: { [key: string]: (element: T, event: Event) => void };
}

export function createElement<T extends HTMLElement>(
  options: ElementOptions<T>,
): T {
  const element = document.createElement(options.tag) as T;
  if (options.classNames) {
    options.classNames.forEach((className) => {
      element.classList.add(className);
    });
  }

  if (options.textContent) {
    element.textContent = options.textContent;
  }

  if (options.events) {
    for (const [eventType, eventHandler] of Object.entries(options.events)) {
      element.addEventListener(eventType, (event) =>
        eventHandler(element, event),
      );
    }
  }

  return element;
}
