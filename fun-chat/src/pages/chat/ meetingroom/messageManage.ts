import "./meetingRoom.css";
import { Component } from "../../../utils/component";
import type { MessageSendRequest } from "../../../utils/requestTypes";
import type { MessageSendResponse } from "../../../utils/responceTypes";
import type { WebSocketManager } from "../../../utils/webSocketManager";
import type { MeetingField } from "./meetingField";
import type { MeetingRoomWrapper } from "./meetingRoomWrapper";

export class MessageManage extends Component<"div"> {
  private messageInput: Component<"textarea">;
  private sendButton: Component<"button">;
  // private recipientId: string | null = null; // Хранит id получателя
  private wsManager: WebSocketManager;
  private meetingField: MeetingField;
  private meetingRoom: MeetingRoomWrapper;
  constructor(
    wsManager: WebSocketManager,
    meetingField: MeetingField,
    meetingRoom: MeetingRoomWrapper,
  ) {
    super({
      tag: "div",
      className: "message-manage",
    });
    this.wsManager = wsManager;
    this.meetingRoom = meetingRoom;
    this.messageInput = new Component({
      tag: "textarea",
      className: "message-input",
    });
    this.meetingField = meetingField;
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

  // public setRecipient(recipientId: string): void {
  //   this.recipientId = recipientId;
  //   console.log(`Recipient set to: ${recipientId}`);
  // }

  private async sendMessage(): Promise<void> {
    const activeUserId = this.meetingRoom.getActiveUserId(); // Используем activeUserId
    if (!activeUserId) {
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
        to: activeUserId,
        text: messageText,
      },
    };

    try {
      console.log("Sending payload:", payload);
      const response = await this.wsManager.sendRequest<
        MessageSendRequest,
        MessageSendResponse
      >("MSG_SEND", payload);
      const sentMessage = response.message;
      this.messageInput.getNode().value = "";
      this.meetingField.addMessages([sentMessage]);
      // this.meetingRoom.addMessages(sentMessage.from, [sentMessage]); // Для отправителя
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  }
}
