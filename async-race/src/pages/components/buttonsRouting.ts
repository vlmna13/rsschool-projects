import { createElement } from "../../utils/createElement";
import "../styles/common.css";

export function createButtonGarage() {
  let buttonGarage = createElement<HTMLButtonElement>({
    tag: "button",
    classNames: ["button", "button-garage"],
    textContent: "To garage",
  });
  return buttonGarage;
}

export function createButtonWinners() {
  let buttonWinners = createElement<HTMLButtonElement>({
    tag: "button",
    classNames: ["button", "button-winners"],
    textContent: "To winners",
  });
  return buttonWinners;
}
