import "./meetingRoom.css";
import { Component } from "../../../utils/component";
import type { MessageSendResponse } from "../../../utils/responceTypes";
import type { MessageManage } from "./messageManage";

export class MessageWrapper extends Component<"div"> {
  private message: MessageSendResponse["message"];
  private messageTextElement!: Component<"p">;
  private editStatusElement!: Component<"span">;
  private deliveryStatusElement!: Component<"span">;
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

  public updateText(newText: string, isEdited: boolean): void {
    this.messageTextElement.getNode().textContent = `${this.message.from}: ${newText}${isEdited ? " (edited)" : ""}`;
    this.message.text = newText;
    this.message.status.isEdited = isEdited;
  }

  private createMessageElements(): void {
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    const userLogin = user.login;   
    this.messageTextElement = new Component({
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

    this.editStatusElement = new Component({
      tag: "span",
      className: "message-edit-status",
      text: this.message.status.isEdited ? "(edited)" : "",
    });

    this.deliveryStatusElement = new Component({
      tag: "span",
      className: "message-delivery-status",
      text: "",
    });

    this.getNode().dataset.id = this.message.id;
    if (this.message.from === userLogin) {
      const editMessageButton = this.createEditButton();
      const deleteMessageButton = this.createDeleteButton();
      this.appendChildren([editMessageButton, deleteMessageButton]);
    }
    this.appendChildren([
      date,
      this.messageTextElement,
      this.editStatusElement,
      this.deliveryStatusElement,
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

    deleteMessageButton.getNode().addEventListener("click", () => {
      this.messageManage.deleteMessage(this.message.id);
    });

    return deleteMessageButton;
  }

  
}
