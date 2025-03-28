import { createElement } from "../../../utils/createElement";
import "./raceControlButtons.css";

export function startRaceButton() {
  const startButton = createElement<HTMLButtonElement>({
    tag: "button",
    classNames: ["button", "button-start"],
    textContent: "START",
  });
  return startButton;
}

export function resetRaceButton() {
  const resetButton = createElement<HTMLButtonElement>({
    tag: "button",
    classNames: ["button", "button-reset"],
    textContent: "RESET",
  });
  return resetButton;
}

export function generateCars() {
  const createCarsButton = createElement<HTMLButtonElement>({
    tag: "button",
    classNames: ["button", "button-generate"],
    textContent: "GENERATE CARS",
  });
  return createCarsButton;
}

export function createRaceControlButtons() {
  const raceControlButtons = createElement<HTMLDivElement>({
    tag: "div",
    classNames: ["wrapper-race-controls"],
  });
  const startButton = startRaceButton();
  const resetButton = resetRaceButton();
  const createCarsButton = generateCars();
  raceControlButtons.append(startButton, resetButton, createCarsButton);
  return raceControlButtons;
}
