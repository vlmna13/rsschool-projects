import "./footerComponent.css";
import { Component } from "../utils/component";

export class FooterComponent extends Component<"footer"> {
  constructor() {
    super({
      tag: "footer",
      className: "footer-wrapper",
    });
    const author = new Component({
      tag: "a",
      className: "author-link",
      text: "vlmna13     " + "2024",
    });
    author.getNode().setAttribute("href", "https://github.com/vlmna13");
    author.getNode().setAttribute("target", "_blank");

    const rsschool = new Component({
      tag: "a",
      className: "rsschool-link",
    });
    const img = new Component({
      tag: "img",
      className: "rsschool-logo",
    });
    img.getNode().setAttribute("src", "public/fav/rs-school-logo.svg");
    rsschool.appendChildren([img]);

    this.appendChildren([author, rsschool]);
  }
}
