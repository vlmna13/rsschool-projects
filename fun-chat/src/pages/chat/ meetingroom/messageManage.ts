import "./meetingRoom.css";
import { Component } from "../../../utils/component";
import type {
  MessageDeleteRequest,
  MessageEditRequest,
  MessageSendRequest,
} from "../../../utils/requestTypes";
import type {
  MessageDeleteResponse,
  MessageEditResponse,
  MessageSendResponse,
} from "../../../utils/responceTypes";
import type { WebSocketManager } from "../../../utils/webSocketManager";
import type { MeetingField } from "./meetingField";
import type { MeetingRoomWrapper } from "./meetingRoomWrapper";

export class MessageManage extends Component<"div"> {
  public meetingRoom: MeetingRoomWrapper;
  private messageInput: Component<"textarea">;
  private sendButton: Component<"button">;
  private wsManager: WebSocketManager;
  private meetingField: MeetingField;
  private editingMessageId: string | null = null;

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
    this.toggleInputState(false);
    this.appendChildren([this.messageInput, this.sendButton]);
    this.sendButton.getNode().addEventListener("click", () => {
      if (this.editingMessageId) {
        this.editMessage();
      } else {
        this.sendMessage();
      }
    });
  }
  public toggleInputState(isEnabled: boolean): void {
    this.messageInput.getNode().disabled = !isEnabled;
    this.sendButton.getNode().disabled = !isEnabled;
  }

  public startEditingMessage(message: MessageSendResponse["message"]): void {
    this.editingMessageId = message.id;
    this.messageInput.getNode().value = message.text;
  }
  public async editMessage(): Promise<void> {
    const newText = this.messageInput.getNode().value;
    if (!this.editingMessageId) return;

    const payload: MessageEditRequest = {
      message: {
        id: this.editingMessageId,
        text: newText,
      },
    };
    try {
      const response = await this.wsManager.sendRequest<
        MessageEditRequest,
        MessageEditResponse
      >("MSG_EDIT", payload);
      const updatedMessage = response.message;
      const activeUserId = this.meetingRoom.getActiveUserId();
      if (activeUserId) {
        const userMessages =
          this.meetingRoom.userMessages.get(activeUserId) || [];
        const messageIndex = userMessages.findIndex(
          (msg) => msg.id === updatedMessage.id,
        );
        userMessages[messageIndex].text = updatedMessage.text;
        userMessages[messageIndex].status.isEdited =
          updatedMessage.status.isEdited;
        this.meetingRoom.userMessages.set(activeUserId, userMessages);
        const messageWrapper = this.meetingField.getMessageElementById(
          updatedMessage.id,
        );
        if (messageWrapper) {
          messageWrapper.updateText(
            updatedMessage.text,
            updatedMessage.status.isEdited,
          );
        } else {
          console.warn(
            `MessageWrapper with ID ${updatedMessage.id} not found.`,
          );
        }
      }
      this.editingMessageId = null;
      this.messageInput.getNode().value = "";
    } catch (error) {
      console.error("Failed to edit message:", error);
    }
  }

  public async deleteMessage(messageId: string): Promise<void> {
    const activeUserId = this.meetingRoom.getActiveUserId();
    if (!activeUserId) {
      console.error("Recipient is not set.");
      return;
    }
    const payload: MessageDeleteRequest = {
      message: {
        id: messageId,
      },
    };
    try {
      const response = await this.wsManager.sendRequest<
        MessageDeleteRequest,
        MessageDeleteResponse
      >("MSG_DELETE", payload);
      const deletedMessage = response.message;
      const userMessages =
        this.meetingRoom.userMessages.get(activeUserId) || [];
      const messageIndex = userMessages.findIndex(
        (msg) => msg.id === deletedMessage.id,
      );
      userMessages.splice(messageIndex, 1);
      this.meetingRoom.userMessages.set(activeUserId, userMessages);
      const messageWrapper = this.meetingField.getMessageElementById(
        deletedMessage.id,
      );
      if (messageWrapper) {
        messageWrapper.destroy();
      } else {
        console.warn(`MessageWrapper with ID ${deletedMessage.id} not found.`);
      }
    } catch (error: any) {
      if (error.payload.error === "incorrect message id") {
        console.error("Сообщение не найдено.");
      } else if (error.payload.error === "user not sender cannot be executed") {
        alert("Вы не можете редактировать или удалять это сообщение.");
      } else {
        console.error("Неизвестная ошибка:", error);
      }
    }
  }

  private async sendMessage(): Promise<void> {
    const activeUserId = this.meetingRoom.getActiveUserId();
    if (!activeUserId) {
      console.error("Recipient is not set.");
      return;
    }

    const messageText = this.messageInput.getNode().value;
    const payload: MessageSendRequest = {
      message: {
        to: activeUserId,
        text: messageText,
      },
    };

    try {
      const response = await this.wsManager.sendRequest<
        MessageSendRequest,
        MessageSendResponse
      >("MSG_SEND", payload);
      const sentMessage = response.message;
      sentMessage.status.isDelivered = false;
      sentMessage.status.isReaded = false;
      const userMessages =
        this.meetingRoom.userMessages.get(activeUserId) || [];
      userMessages.push(sentMessage);
      this.meetingRoom.userMessages.set(activeUserId, userMessages);
      this.messageInput.getNode().value = "";
      this.meetingField.addMessages([sentMessage]);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  }
}
