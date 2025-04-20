import "./meetingRoom.css";
import { Component } from "../../../utils/component";
import type { MessageSendResponse } from "../../../utils/responceTypes";

export class MessageWrapper extends Component<"div"> {
  constructor(message: MessageSendResponse["message"]) {
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
    const formattedDate = new Date(message.datetime).toLocaleString();
    const date = new Component({
      tag: "p",
      className: ".message-date",
      text: formattedDate,
    });
    this.getNode().dataset.id = message.id;

    this.appendChildren([
      editMessageButton,
      date,
      deleteMessageButton,
      messageText,
    ]);
  }
}
