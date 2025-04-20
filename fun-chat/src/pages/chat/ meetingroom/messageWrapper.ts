import "./meetingRoom.css";
import { Component } from "../../../utils/component";
import type { MessageSendResponse } from "../../../utils/responceTypes";
import type { MessageManage } from "./messageManage";

export class MessageWrapper extends Component<"div"> {
  private message: MessageSendResponse["message"];

  constructor(
    message: MessageSendResponse["message"],
    private messageManage: MessageManage,
  ) {
    super({
      tag: "div",
      className: "message-wrapper",
    });

    this.message = message;
    this.createMessageElements();
  }

  private createMessageElements(): void {
    const editMessageButton = this.createEditButton();
    const deleteMessageButton = this.createDeleteButton();
    const messageText = new Component({
      tag: "p",
      className: "message-text",
      text: `${this.message.from}: ${this.message.text}`,
    });
    const formattedDate = new Date(this.message.datetime).toLocaleString();
    const date = new Component({
      tag: "p",
      className: ".message-date",
      text: formattedDate,
    });

    this.getNode().dataset.id = this.message.id;

    this.appendChildren([
      editMessageButton,
      date,
      deleteMessageButton,
      messageText,
    ]);
  }

  private createEditButton(): Component<"button"> {
    const editMessageButton = new Component({
      tag: "button",
      className: "edit-message-button",
      text: "Ed",
    });
    editMessageButton.getNode().addEventListener("click", () => {
      this.messageManage.startEditingMessage(this.message);
    });

    return editMessageButton;
  }

  private createDeleteButton(): Component<"button"> {
    const deleteMessageButton = new Component({
      tag: "button",
      className: "delete-message-button",
      text: "Del",
    });

    // // Обработчик клика на кнопку удаления
    // deleteMessageButton.getNode().addEventListener("click", () => {
    //   this.messageManage.deleteMessage(this.message.id);
    // });

    return deleteMessageButton;
  }
}
