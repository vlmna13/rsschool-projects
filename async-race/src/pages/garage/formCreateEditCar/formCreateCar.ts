import { createElement } from "../../../utils/createElement";
import "./formCreateEditCar.css";
import { createCar } from "./functionCreateCar";

// export function createFormCreateCar(garageContainer: HTMLDivElement) {
//   const formWrapper = createElement<HTMLDivElement>({
//     tag: "div",
//     classNames: ["form-create-car"],
//   });
//   const inputText = createElement<HTMLInputElement>({
//     tag: "input",
//     classNames: ["input-text"],
//   });
//   inputText.type = "text";
//   const inputColor = createElement<HTMLInputElement>({
//     tag: "input",
//     classNames: ["input-color"],
//   });
//   inputColor.type = "color";
//   const buttonCreate = createElement<HTMLButtonElement>({
//     tag: "button",
//     classNames: ["button", "button-create"],
//     textContent: "CREATE",
//   });
//   buttonCreate.addEventListener("click", () => {
//     createCar(garageContainer, inputText.value, inputColor.value);
//   });

//   formWrapper.append(inputText, inputColor, buttonCreate);

//   return formWrapper;
// }

export class FormCreateCar {
  private formWrapper: HTMLDivElement;
  private inputText: HTMLInputElement;
  private inputColor: HTMLInputElement;
  private buttonCreate: HTMLButtonElement;

  constructor(private garageContainer: HTMLDivElement) {
    this.formWrapper = createElement<HTMLDivElement>({
      tag: "div",
      classNames: ["form-create-car"],
    });

    this.inputText = createElement<HTMLInputElement>({
      tag: "input",
      classNames: ["input-text"],
    });
    this.inputText.type = "text";

    this.inputColor = createElement<HTMLInputElement>({
      tag: "input",
      classNames: ["input-color"],
    });
    this.inputColor.type = "color";

    this.buttonCreate = createElement<HTMLButtonElement>({
      tag: "button",
      classNames: ["button", "button-create"],
      textContent: "CREATE",
    });

    this.addEventListeners();
    this.formWrapper.append(this.inputText, this.inputColor, this.buttonCreate);
  }

  private addEventListeners(): void {
    this.buttonCreate.addEventListener("click", () => {
      createCar(
        this.garageContainer,
        this.inputText.value,
        this.inputColor.value,
      );
    });
  }

  public render(): HTMLDivElement {
    return this.formWrapper;
  }
}
