import { createElement } from "../../../utils/createElement";
import "./formCreateEditCar.css";

export function createFormEditCar() {
  const formWrapper = createElement<HTMLDivElement>({
    tag: "div",
    classNames: ["form-edit-car"],
  });
  const inputText = createElement<HTMLInputElement>({
    tag: "input",
    classNames: ["input-text", "disabled"],
  });
  inputText.disabled = true;
  inputText.type = "text";
  const inputColor = createElement<HTMLInputElement>({
    tag: "input",
    classNames: ["input-color", "disabled"],
  });
  inputColor.type = "color";
  inputColor.disabled = true;
  const buttonEdit = createElement<HTMLButtonElement>({
    tag: "button",
    classNames: ["button", "button-edit", "disabled"],
    textContent: "UPDATE",
  });
  buttonEdit.disabled = true;
  formWrapper.append(inputText, inputColor, buttonEdit);

  return formWrapper;
}
