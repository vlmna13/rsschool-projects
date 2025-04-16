import "./loginView.css";
import { Component } from "../../utils/component";
import { router } from "../../utils/router";

export class InfoButtonComponent extends Component<"button"> {
  constructor(parentComponent: HTMLElement) {
    super({
      tag: "button",
      className: "info-button",
      text: "Информация",
    });
    this.addListener("click", () => {
      parentComponent.remove();
      router.navigate("information");
    });
  }
}
