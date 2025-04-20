import "./meetingRoom.css";
import { Component } from "../../../utils/component";
import type { MessageEditRequest, MessageSendRequest } from "../../../utils/requestTypes";
import type { MessageEditResponse, MessageSendResponse } from "../../../utils/responceTypes";
import type { WebSocketManager } from "../../../utils/webSocketManager";
import type { MeetingField } from "./meetingField";
import type { MeetingRoomWrapper } from "./meetingRoomWrapper";

export class MessageManage extends Component<"div"> {
  private messageInput: Component<"textarea">;
  private sendButton: Component<"button">;
  private wsManager: WebSocketManager;
  private meetingField: MeetingField;
  private meetingRoom: MeetingRoomWrapper;
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
    this.appendChildren([this.messageInput, this.sendButton]);
    this.sendButton.getNode().addEventListener("click", () => {
      if (this.editingMessageId) {
        this.editMessage();
      } else {
        this.sendMessage();
      }
    });
  }

  public startEditingMessage(message: MessageSendResponse["message"]): void {
    this.editingMessageId = message.id;
    this.messageInput.getNode().value = message.text;
  }
  public async editMessage(): Promise<void> {
    const newText = this.messageInput.getNode().value;
    if (!this.editingMessageId) {
      console.error("No message is being edited.");
      return;
    }
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
        const userMessages = this.meetingRoom.userMessages.get(activeUserId) || [];
        const messageIndex = userMessages.findIndex(
          (msg) => msg.id === updatedMessage.id,
        );
        if(!messageIndex) {
          return;
        }
        userMessages[messageIndex].text = updatedMessage.text;
        userMessages[messageIndex].status.isEdited = updatedMessage.status.isEdited;
        this.meetingRoom.userMessages.set(activeUserId, userMessages);
        this.meetingRoom.getMeetingField().displayMessages(userMessages);
      }
        this.editingMessageId = null;
      this.messageInput.getNode().value = "";
    } catch (error) {
      console.error("Failed to edit message:", error);
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
      this.messageInput.getNode().value = "";
      this.meetingField.addMessages([sentMessage]);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  }
}
