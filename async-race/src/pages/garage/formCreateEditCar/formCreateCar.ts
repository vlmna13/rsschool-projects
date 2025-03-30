import { createElement } from "../../../utils/createElement";
import "./formCreateEditCar.css";
import { createCar } from "./functionCreateCar";

export function createFormCreateCar(garageContainer: HTMLDivElement) {
  const formWrapper = createElement<HTMLDivElement>({
    tag: "div",
    classNames: ["form-create-car"],
  });
  const inputText = createElement<HTMLInputElement>({
    tag: "input",
    classNames: ["input-text"],
  });
  inputText.type = "text";
  const inputColor = createElement<HTMLInputElement>({
    tag: "input",
    classNames: ["input-color"],
  });
  inputColor.type = "color";
  const buttonCreate = createElement<HTMLButtonElement>({
    tag: "button",
    classNames: ["button", "button-create"],
    textContent: "CREATE",
  });
  buttonCreate.addEventListener("click", () => {
    createCar(garageContainer, inputText.value, inputColor.value);
  });

  formWrapper.append(inputText, inputColor, buttonCreate);

  return formWrapper;
}
