import { createElement } from "../../../utils/createElement";
import { Car } from "../../../utils/types";
import "./raceField.css";

export function createButtonSelect() {
  const buttonSelect = createElement<HTMLButtonElement>({
    tag: "button",
    classNames: ["button", "button-select"],
    textContent: "SELECT",
  });
  return buttonSelect;
}

export function createButtonDelete() {
  const buttonDelete = createElement<HTMLButtonElement>({
    tag: "button",
    classNames: ["button", "button-delete"],
    textContent: "DELETE",
  });
  return buttonDelete;
}

export function createSelectDeleteWrapper(data: Car) {
  const selectDeleteWrapper = createElement<HTMLDivElement>({
    tag: "div",
    classNames: ["select-delete-wrapper"],
  });

  const buttonSelect = createButtonSelect();
  const buttonDelete = createButtonDelete();
  const carModel = createElement<HTMLParagraphElement>({
    tag: "p",
    classNames: ["car-model"],
    textContent: data.name,
  });
  selectDeleteWrapper.append(buttonSelect, buttonDelete, carModel);
  return selectDeleteWrapper;
}
