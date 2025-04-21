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
    this.messageTextElement.getNode().textContent = `${this.message.from} ' : ' ${newText}`;
    this.message.text = newText;
    this.editStatusElement.getNode().textContent = isEdited ? "(edited)" : "";
  }
  public updateStatus(isReaded?: boolean, isDelivered?: boolean): void {
    if (isReaded) {
      this.deliveryStatusElement.getNode().textContent = "Read";
      this.message.status.isReaded = true;
      this.message.status.isDelivered = true; // Если прочитано, то оно уже доставлено
    } else if (isDelivered) {
      this.deliveryStatusElement.getNode().textContent = "Delivered";
      this.message.status.isDelivered = true;
      this.message.status.isReaded = false; // Если доставлено, но не прочитано
    } else {
      this.deliveryStatusElement.getNode().textContent = "Sent";
      this.message.status.isDelivered = false;
      this.message.status.isReaded = false; // Если только отправлено
    }
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

    // Добавляем элемент статуса только для сообщений, отправленных текущим пользователем
    if (this.message.from === userLogin) {
      this.deliveryStatusElement = new Component({
        tag: "span",
        className: "message-delivery-status",
        text: this.message.status.isReaded
          ? "Read"
          : this.message.status.isDelivered
            ? "Delivered"
            : "Sent",
      });

      // Добавляем кнопки редактирования и удаления только для отправителя
      const editMessageButton = this.createEditButton();
      const deleteMessageButton = this.createDeleteButton();
      this.appendChildren([
        editMessageButton,
        deleteMessageButton,
        this.deliveryStatusElement,
      ]);
    }

    this.getNode().dataset.id = this.message.id;

    this.appendChildren([
      date,
      this.messageTextElement,
      this.editStatusElement,
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
