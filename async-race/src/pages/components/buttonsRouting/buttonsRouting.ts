import { createElement } from "../../../utils/createElement";
import "./buttonsRouting.css";

export function createWrapperButtons() {
  const wrapperButtons = createElement<HTMLDivElement>({
    tag: "div",
    classNames: ["wrapper-buttons-routing"],
  });

  const buttonGarage = createElement<HTMLLinkElement>({
    tag: "a",
    classNames: ["button", "button-garage"],
    textContent: "TO GARAGE",
  });
  buttonGarage.href = "#garage";

  const buttonWinners = createElement<HTMLLinkElement>({
    tag: "a",
    classNames: ["button", "button-winners"],
    textContent: "TO WINNERS",
  });
  buttonWinners.href = "#winners";

  wrapperButtons.append(buttonGarage, buttonWinners);
  return wrapperButtons;
}
