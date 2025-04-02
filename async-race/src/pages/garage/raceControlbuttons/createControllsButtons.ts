import { createElement } from "../../../utils/createElement";
import "./raceControlButtons.css";

export function createStartRaceButton(): HTMLButtonElement {
  const raceButton = createElement<HTMLButtonElement>({
    tag: "button",
    classNames: ["button", "button-race"],
    textContent: "RACE",
  });
  return raceButton;
}

export function createResetRaceButton(): HTMLButtonElement {
  const resetButton = createElement<HTMLButtonElement>({
    tag: "button",
    classNames: ["button", "button-reset"],
    textContent: "RESET",
  });
  return resetButton;
}

export function createGenerateCarsButton(): HTMLButtonElement {
  const generateCars = createElement<HTMLButtonElement>({
    tag: "button",
    classNames: ["button", "button-generate"],
    textContent: "GENERATE CARS",
  });
  return generateCars;
}
