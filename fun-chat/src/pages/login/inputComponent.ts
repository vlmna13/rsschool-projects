import { Component } from "../../utils/component";

export class InputComponent extends Component<"div"> {
  private input: Component<"input">;
  private label: Component<"label">;
  private errorMessage: Component<"span">;
  private currentValue: string = "";
  private validateInput: (value: string) => boolean;
  constructor(
    labelText: string,
    placeholder: string,
    type: string,
    wrapperClass: string,
    labelClass: string,
    inputClass: string,
    errorClass: string,
    validateInput: (value: string) => boolean,
  ) {
    super({
      tag: "div",
      className: wrapperClass,
    });
    this.validateInput = validateInput;
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
      tag: "span",
      className: errorClass,
      text: "",
    });
    this.input.addListener("input", (event) => this.handleInput(event));
    this.appendChildren([this.label, this.input, this.errorMessage]);
  }

  public getValue(): string {
    return this.currentValue;
  }

  public setType(type: string): void {
    this.input.getNode().setAttribute("type", type);
  }

  private handleInput(event: Event): void {
    if (!(event.target instanceof HTMLInputElement)) {
      return;
    }
    const value = event.target.value;
    this.currentValue = value;
    if (!this.validateInput(value)) {
      this.errorMessage.setTextContent("Некорректный ввод");
      this.errorMessage.toggleClass("visible");
    } else {
      this.errorMessage.setTextContent("");
      this.errorMessage.toggleClass("visible");
    }
  }
}
