export interface ComponentOptions<T extends keyof HTMLElementTagNameMap> {
  tag: T;
  className?: string;
  text?: string;
}

export class Component<T extends keyof HTMLElementTagNameMap> {
  private children: Component<keyof HTMLElementTagNameMap>[] = [];
  private element: HTMLElementTagNameMap[T];

  constructor(
    options: ComponentOptions<T>,
    ...children: Component<keyof HTMLElementTagNameMap>[]
  ) {
    const { tag, className = "", text = "" } = options;
    const element = document.createElement<T>(tag);
    element.className = className;
    element.textContent = text;
    this.element = element;

    if (children) {
      this.appendChildren(children);
    }
  }

  public appendElement(child: Component<keyof HTMLElementTagNameMap>): void {
    this.children.push(child);
    this.element.append(child.getNode());
  }

  public appendChildren(
    children: Component<keyof HTMLElementTagNameMap>[],
  ): void {
    children.forEach((child) => {
      this.appendElement(child);
    });
  }

  public getNode(): HTMLElementTagNameMap[T] {
    return this.element;
  }

  public getChildren(): Component<keyof HTMLElementTagNameMap>[] {
    return this.children;
  }

  public setTextContent(content: string): void {
    this.element.textContent = content;
  }

  public toggleClass(className: string): void {
    this.element.classList.toggle(className);
  }

  public addListener(event: string, listener: EventListener): void {
    this.element.addEventListener(event, listener);
  }

  public removeListener(event: string, listener: EventListener): void {
    this.element.removeEventListener(event, listener);
  }

  public destroyChildren(): void {
    this.children.forEach((child) => {
      child.destroy();
    });
    this.children.length = 0;
  }

  public destroy(): void {
    this.destroyChildren();
    this.element.remove();
  }
}
