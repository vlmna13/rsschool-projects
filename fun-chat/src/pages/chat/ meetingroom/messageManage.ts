import "./meetingRoom.css";
import { Component } from "../../../utils/component";
import type { MessageSendRequest } from "../../../utils/requestTypes";
import type { MessageSendResponse } from "../../../utils/responceTypes";
import type { WebSocketManager } from "../../../utils/webSocketManager";

export class MessageManage extends Component<"div"> {
  private messageInput: Component<"textarea">;
  private sendButton: Component<"button">;
  private recipientId: string | null = null; // Хранит id получателя
  private wsManager: WebSocketManager;

  constructor(wsManager: WebSocketManager) {
    super({
      tag: "div",
      className: "message-manage",
    });
    this.wsManager = wsManager;

    this.messageInput = new Component({
      tag: "textarea",
      className: "message-input",
    });

    this.sendButton = new Component({
      tag: "button",
      className: "send-message-button",
      text: "Порадовать",
    });
    this.appendChildren([this.messageInput, this.sendButton]);
    this.sendButton.getNode().addEventListener("click", () => {
      this.sendMessage();
    });
  }

  public setRecipient(recipientId: string): void {
    this.recipientId = recipientId;
    console.log(`Recipient set to: ${recipientId}`);
  }

  private async sendMessage(): Promise<void> {
    if (!this.recipientId) {
      console.error("Recipient is not set.");
      return;
    }

    const messageText = this.messageInput.getNode().value.trim();
    if (!messageText) {
      console.error("Message text is empty.");
      return;
    }

    const payload: MessageSendRequest = {
      message: {
        to: this.recipientId,
        text: messageText,
      },
    };

    try {
      const response = await this.wsManager.sendRequest<
        MessageSendRequest,
        MessageSendResponse
      >("MSG_SEND", payload);
      const sentMessage = response.message;
      this.messageInput.getNode().value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  }
}
