import { Component } from "../../utils/component";
import { router } from "../../utils/router";
import "./loginView.css";

export class InfoButtonComponent extends Component<"button"> {
  constructor(parentComponent: Component<"main">) {
    super({
      tag: "button",
      className: "info-button",
      text: "Веселая информация",
    });
    this.addListener("click", () => {
      parentComponent.destroyChildren();
      router.navigate("information");
    });
  }
}
