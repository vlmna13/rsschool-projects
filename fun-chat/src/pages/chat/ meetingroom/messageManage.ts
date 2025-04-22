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

export class MessageManage extends Component<"form"> {
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
      tag: "form",
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
    this.getNode().addEventListener("submit", (event) => {
      event.preventDefault();
      this.handleSendMessage();
    });
    this.messageInput.getNode().addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        this.handleSendMessage();
      }
    });
  }

  public getActiveUserId(): string | null {
    return this.meetingRoom.getActiveUserId();
  }
  public toggleInputState(isEnabled: boolean): void {
    this.messageInput.getNode().disabled = !isEnabled;
    this.sendButton.getNode().disabled = !isEnabled;
  }
  public clearMessageInput(): void {
    this.messageInput.getNode().value = "";
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

  public markMessagesAsRead(messageIds: string[]): void {
    const activeUserId = this.meetingRoom.getActiveUserId();
    const currentUser = JSON.parse(
      sessionStorage.getItem("user") || "{}",
    ).login;

    if (!activeUserId || !currentUser) {
      console.error("Either activeUserId or currentUser is null or undefined.");
      return;
    }

    const userMessages = this.meetingRoom.userMessages.get(activeUserId) || [];
    const messagesToMarkAsRead = userMessages.filter(
      (msg) => messageIds.includes(msg.id) && msg.from !== currentUser,
    );

    if (messagesToMarkAsRead.length === 0) {
      return;
    }
    messagesToMarkAsRead.forEach((msg) => {
      this.wsManager
        .sendRequest("MSG_READ", {
          message: { id: msg.id },
        })
        .catch((error) => {
          console.error(`Failed to mark message ${msg.id} as read:`, error);
        });
    });
    messagesToMarkAsRead.forEach((msg) => {
      const messageIndex = userMessages.findIndex((m) => m.id === msg.id);
      userMessages[messageIndex].status.isReaded = true;
    });

    this.meetingRoom.userMessages.set(activeUserId, userMessages);
  }

  public async sendMessage(messageText: string): Promise<void> {
    const activeUserId = this.meetingRoom.getActiveUserId();
    if (!activeUserId) {
      console.error("Recipient is not set.");
      return;
    }

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
      sentMessage.status.isDelivered = sentMessage.status.isDelivered || false;
      sentMessage.status.isReaded = false;

      const userMessages =
        this.meetingRoom.userMessages.get(activeUserId) || [];
      userMessages.push(sentMessage);
      this.meetingRoom.userMessages.set(activeUserId, userMessages);
      this.messageInput.getNode().value = "";
      this.meetingField.addMessages([sentMessage]);

      const lastMessageElement =
        this.meetingField.getAllMessageElements().length > 0
          ? this.meetingField
              .getAllMessageElements()
              [this.meetingField.getAllMessageElements().length - 1].getNode()
          : null;

      if (lastMessageElement) {
        lastMessageElement.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  }

  private handleSendMessage(): void {
    const messageText = this.messageInput.getNode().value.trim();
    if (!messageText) {
      return;
    }
    if (this.editingMessageId) {
      this.editMessage();
    } else {
      this.sendMessage(messageText);
    }
  }
}
