import { createElement } from "../../../utils/createElement";
import "./formCreateEditCar.css";

export function createFormCreateCar() {
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
  formWrapper.append(inputText, inputColor, buttonCreate);

  return formWrapper;
}
