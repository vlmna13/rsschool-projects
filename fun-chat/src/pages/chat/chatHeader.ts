import "./chatView.css";
import { Component } from "../../utils/component";
import { InfoButtonComponent } from "../login/infobuttonComponent";

export class ChatHeader extends Component<"div"> {
  constructor(userLogin: string, mainComponent: Component<"main">) {
    super({
      tag: "div",
      className: "chat-header",
    });

    const circle = new Component({
      tag: "div",
      className: "circle",
      text: userLogin[0].toUpperCase(),
    });
    const chatTitle = new Component({
      tag: "h3",
      className: "chat-title",
      text: userLogin,
    });

    const buttonExit = new Component({
      tag: "button",
      className: "button-exit",
      text: "Выйти",
    });
    const buttonWrapper = new Component({
      tag: "div",
      className: "button-wrapper",
    });
    const infoButton = new InfoButtonComponent(mainComponent);
    buttonWrapper.appendChildren([buttonExit, infoButton]);
    this.appendChildren([circle, chatTitle, buttonWrapper]);
    console.log("chatheader  ", userLogin);
  }
}
