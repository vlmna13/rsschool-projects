import { Params } from './types';

export default class Creator<T extends HTMLElement = HTMLElement> {
  private element: T;
  constructor(params: Params) {
    this.element = this.createElement(params) as T;
  }

  private createElement(params: Params): HTMLElement {
    const element = document.createElement(params.tag);
    if (params.classNames) {
      this.addClasses(element, params.classNames);
    }
    if (params.textContent) {
      this.addTextContent(element, params.textContent);
    }
    return element;
  }

  public getElement(): T {
    return this.element;
  }

  private addClasses(element: HTMLElement, classNames: string[]): void {
    classNames.forEach((className) => {
      element.classList.add(className);
    });
  }

  private addTextContent(element: HTMLElement, text: string): void {
    element.textContent = text;
  }

  public destroy(): void {
    this.element.remove();
  }

  appendTo(parent: HTMLElement): void {
    parent.appendChild(this.element);
  }
}
