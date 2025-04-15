import { Component } from "../../utils/component";

export class InputComponent extends Component<"div"> {
  private input: Component<"input">;
  private label: Component<"label">;
  private errorMessage: Component<"p">;
  private currentValue: string = "";
  constructor(
    labelText: string,
    placeholder: string,
    type: string,
    wrapperClass: string,
    labelClass: string,
    inputClass: string,
    errorClass: string,
  ) {
    super({
      tag: "div",
      className: wrapperClass,
    });
    this.label = new Component({
      tag: "label",
      className: labelClass,
      text: labelText,
    });

    this.input = new Component({
      tag: "input",
      className: inputClass,
    });
    this.input.getNode().setAttribute("type", type);
    this.input.getNode().setAttribute("placeholder", placeholder);

    this.errorMessage = new Component({
      tag: "p",
      className: errorClass,
      text: "",
    });
    this.appendChildren([this.label, this.input, this.errorMessage]);
    this.input.addListener("input", (event) => this.handleInput(event));
  }

  public getValue(): string {
    return this.currentValue;
  }

  public showError(message: string): void {
    this.errorMessage.setTextContent(message);
  }

  public clearError(): void {
    this.errorMessage.setTextContent("");
  }

  public addInputListener(callback: (value: string) => void): void {
    this.input.getNode().addEventListener("input", () => {
      callback(this.currentValue);
    });
  }

  private handleInput(event: Event): void {
    if (!(event.target instanceof HTMLInputElement)) {
      return;
    }
    this.currentValue = event.target.value;
  }
}
