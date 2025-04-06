import { createElement } from "../../utils/createElement";
export function addCarFromSprite(
  color: string,
  classNames: string[],
): HTMLDivElement {
  const svgNamespace = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNamespace, "svg");
  svg.setAttribute("height", "40px");
  svg.setAttribute("width", "60px");
  svg.setAttribute("fill", color);
  const use = document.createElementNS(svgNamespace, "use");
  use.setAttributeNS(
    "http://www.w3.org/1999/xlink",
    "xlink:href",
    "./img/sprite.svg#car",
  );

  svg.appendChild(use);
  const carImageEl = createElement<HTMLDivElement>({
    tag: "div",
    classNames: classNames,
  });
  carImageEl.appendChild(svg);
  return carImageEl;
}
