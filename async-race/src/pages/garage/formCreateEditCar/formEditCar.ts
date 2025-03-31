import { createElement } from "../../../utils/createElement";
import "./formCreateEditCar.css";

// export function createFormEditCar() {
//   const formWrapper = createElement<HTMLDivElement>({
//     tag: "div",
//     classNames: ["form-edit-car"],
//   });
//   const inputText = createElement<HTMLInputElement>({
//     tag: "input",
//     classNames: ["input-text", "disabled"],
//   });
//   inputText.disabled = true;
//   inputText.type = "text";
//   const inputColor = createElement<HTMLInputElement>({
//     tag: "input",
//     classNames: ["input-color", "disabled"],
//   });
//   inputColor.type = "color";
//   inputColor.disabled = true;
//   const buttonEdit = createElement<HTMLButtonElement>({
//     tag: "button",
//     classNames: ["button", "button-edit", "disabled"],
//     textContent: "UPDATE",
//   });
//   buttonEdit.disabled = true;
//   formWrapper.append(inputText, inputColor, buttonEdit);

//   return formWrapper;
// }

export class FormEditCar {
  private formWrapper: HTMLDivElement;
  private inputText: HTMLInputElement;
  private inputColor: HTMLInputElement;
  private buttonEdit: HTMLButtonElement;
  constructor(private garageContainer: HTMLDivElement) {
    this.formWrapper = createElement<HTMLDivElement>({
      tag: "div",
      classNames: ["form-edit-car"],
    });

    this.inputText = createElement<HTMLInputElement>({
      tag: "input",
      classNames: ["input-text", "disabled"],
    });
    this.inputText.disabled = true;
    this.inputText.type = "text";

    this.inputColor = createElement<HTMLInputElement>({
      tag: "input",
      classNames: ["input-color", "disabled"],
    });
    this.inputColor.type = "color";
    this.inputColor.disabled = true;

    this.buttonEdit = createElement<HTMLButtonElement>({
      tag: "button",
      classNames: ["button", "button-edit", "disabled"],
      textContent: "UPDATE",
    });
    this.buttonEdit.disabled = true;

    this.formWrapper.append(this.inputText, this.inputColor, this.buttonEdit);
  }
  public render(): HTMLDivElement {
    return this.formWrapper;
  }
}
