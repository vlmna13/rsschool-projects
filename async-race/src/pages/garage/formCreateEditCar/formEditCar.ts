import { createElement } from "../../../utils/createElement";
import "./formCreateEditCar.css";

export function createFormEditCar() {
  const formWrapper = createElement<HTMLDivElement>({
    tag: "div",
    classNames: ["form-edit-car"],
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
  const buttonEdit = createElement<HTMLButtonElement>({
    tag: "button",
    classNames: ["button", "button-edit"],
    textContent: "UPDATE",
  });
  formWrapper.append(inputText, inputColor, buttonEdit);

  return formWrapper;
}
