import "./headerComponent.css";
import { Component } from "../utils/component";

export class HeaderComponent extends Component<"header"> {
  constructor() {
    super({
      tag: "header",
      className: "header-wrapper",
    });
    const title = new Component({
      tag: "h1",
      className: "title",
      text: "Веселый чат",
    });
    this.appendElement(title);
  }
}
