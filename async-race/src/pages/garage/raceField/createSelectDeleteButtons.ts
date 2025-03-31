import { createElement } from "../../../utils/createElement";
import { Car } from "../../../utils/types";
import "./raceField.css";

export function createSelectDeleteWrapper(data: Car) {
  const selectDeleteWrapper = createElement<HTMLDivElement>({
    tag: "div",
    classNames: ["select-delete-wrapper"],
  });
  const buttonSelect = createElement<HTMLButtonElement>({
    tag: "button",
    classNames: ["button", "button-select"],
    textContent: "SELECT",
  });
  const buttonDelete = createElement<HTMLButtonElement>({
    tag: "button",
    classNames: ["button", "button-delete"],
    textContent: "DELETE",
  });
  const carModel = createElement<HTMLParagraphElement>({
    tag: "p",
    classNames: ["car-model"],
    textContent: data.name,
  });
  selectDeleteWrapper.append(buttonSelect, buttonDelete, carModel);
  return selectDeleteWrapper;
}
