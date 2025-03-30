import { createElement } from "../../../utils/createElement";
import "./buttonsRouting.css";

export function createButtonGarage() {
  let buttonGarage = createElement<HTMLButtonElement>({
    tag: "button",
    classNames: ["button", "button-garage"],
    textContent: "TO GARAGE",
  });
  return buttonGarage;
}

export function createButtonWinners() {
  let buttonWinners = createElement<HTMLButtonElement>({
    tag: "button",
    classNames: ["button", "button-winners"],
    textContent: "TO WINNERS",
  });
  return buttonWinners;
}

export function createWrapperButtons() {
  let wrapperButtons = createElement<HTMLDivElement>({
    tag: "div",
    classNames: ["wrapper-buttons-routing"],
  });
  const buttonGarage = createButtonGarage();
  const buttonWinners = createButtonWinners();
  wrapperButtons.append(buttonGarage, buttonWinners);
  return wrapperButtons;
}
