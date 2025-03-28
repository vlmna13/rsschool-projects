import { createElement } from "../../../utils/createElement";
import "./raceField.css";

export function createButtonStart() {
  const buttonStart = createElement<HTMLButtonElement>({
    tag: "button",
    classNames: ["button", "button-start"],
    textContent: "A",
  });
  return buttonStart;
}

export function createButtonStop() {
  const buttonStop = createElement<HTMLButtonElement>({
    tag: "button",
    classNames: ["button", "button-stop"],
    textContent: "B",
  });
  return buttonStop;
}
