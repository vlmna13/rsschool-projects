import { createElement } from "../../utils/createElement";
import "../../styles/common.css";

export function createMainElement() {
  const mainElement = createElement<HTMLElement>({
    tag: "main",
    classNames: ["main"],
  });
  return mainElement;
}
