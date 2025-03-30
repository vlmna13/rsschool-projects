import { createElement } from "../../utils/createElement";
import "../../styles/common.css";
import { createWrapperButtons } from "./buttonsRouting/buttonsRouting";

export function createMainElement() {
  const mainElement = createElement<HTMLElement>({
    tag: "main",
    classNames: ["main"],
  });

  const wrapperButtons = createWrapperButtons();

  const childView = createElement<HTMLDivElement>({
    tag: "div",
    classNames: ["child-view"],
  });

  mainElement.append(wrapperButtons, childView);

  return { mainElement, childView };
}
