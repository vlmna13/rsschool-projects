export interface ElementOptions<T extends HTMLElement> {
  tag: string;
  classNames: string[];
  textContent?: string;
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

  return element;
}
