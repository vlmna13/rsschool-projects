import "./meetingRoom.css";
import { Component } from "../../../utils/component";

export class MessageWrapper extends Component<"div"> {
  constructor(message: { from: string; text: string; id: string }) {
    super({
      tag: "div",
      className: "message-wrapper",
    });

    const editMessageButton = new Component({
      tag: "button",
      className: "edit-message-button",
      text: "Ed",
    });
    const deleteMessageButton = new Component({
      tag: "button",
      className: "delete-message-button",
      text: "Del",
    });

    const messageText = new Component({
      tag: "p",
      className: "message-text",
      text: `${message.from}: ${message.text}`,
    });
    this.getNode().dataset.id = message.id;

    this.appendChildren([
      editMessageButton,
      deleteMessageButton,
      messageText,
    ]);
  }
}
