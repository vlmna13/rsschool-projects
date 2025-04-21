import { Component } from "../../../utils/component";
import { RoomHeader } from "./roomHeader";
import "./meetingRoom.css";
import type { WebSocketManager } from "../../../utils/webSocketManager";
import { MeetingField } from "./meetingField";
import { MessageManage } from "./messageManage";
import type { MessageSendResponse } from "../../../utils/responceTypes";

export class MeetingRoomWrapper extends Component<"div"> {
  public userMessages: Map<string, MessageSendResponse["message"][]>;
  private roomHeader: RoomHeader;
  private wsManager: WebSocketManager;
  private meetingField: MeetingField;
  private messageManage: MessageManage;
  private activeUserId: string | null = null; // Хранит id текущего пользователя
  constructor(
    wsManager: WebSocketManager,
    userMessages: Map<string, MessageSendResponse["message"][]>,
  ) {
    super({
      tag: "div",
      className: "meetingroom-wrapper",
    });
    this.wsManager = wsManager;
    this.userMessages = userMessages;
    this.roomHeader = new RoomHeader();
    this.meetingField = new MeetingField();
    this.messageManage = new MessageManage(
      this.wsManager,
      this.meetingField,
      this,
    );
    this.meetingField.setMessageManage(this.messageManage);
    this.appendChildren([
      this.roomHeader,
      this.meetingField,
      this.messageManage,
    ]);
    wsManager.addEventHandler("MSG_DELETE", (payload) => {
      this.handleMessageDelete(payload);
    });
    wsManager.addEventHandler("MSG_EDIT", (payload) => {
      this.handleMessageEdit(payload);
    });
  }

  public getActiveUserId(): string | null {
    return this.activeUserId;
  }

  public setActiveUser(userId: string): void {
    this.activeUserId = userId;
    const messages = this.userMessages.get(userId) || [];
    this.meetingField.displayMessages(messages);
  }
  public addMessages(
    userId: string,
    messages: MessageSendResponse["message"][],
  ): void {
    const existingMessages = this.userMessages.get(userId) || [];
    this.userMessages.set(userId, [...existingMessages, ...messages]);
  }

  public getRoomHeader(): RoomHeader {
    return this.roomHeader;
  }
  public getMeetingField(): MeetingField {
    return this.meetingField;
  }


  private handleMessageEdit(payload: any): void {
    const updatedMessage = payload.message;
    const activeUserId = this.getActiveUserId();
    if (!activeUserId) {
      console.error("No active user.");
      return;
    }
      const userMessages = this.userMessages.get(activeUserId) || [];
    const messageIndex = userMessages.findIndex(
      (msg) => msg.id === updatedMessage.id,
    );
    userMessages[messageIndex].text = updatedMessage.text;
    userMessages[messageIndex].status.isEdited = updatedMessage.status.isEdited;
    this.userMessages.set(activeUserId, userMessages);
    const messageWrapper = this.meetingField.getMessageElementById(updatedMessage.id);
    if (messageWrapper) {
      messageWrapper.updateText(updatedMessage.text, updatedMessage.status.isEdited);
    } else {
      console.warn(`MessageWrapper with ID ${updatedMessage.id} not found.`);
    }
  }
  private handleMessageDelete(payload: any): void {
    const deletedMessage = payload.message;
    const activeUserId = this.getActiveUserId();
    if (!activeUserId) {
      console.error("No active user.");
      return;
    }
    const messageWrapper = this.meetingField.getMessageElementById(deletedMessage.id);
    if (messageWrapper) {
      const userMessages = this.userMessages.get(activeUserId) || [];
      const messageIndex = userMessages.findIndex(
        (msg) => msg.id === deletedMessage.id,
      );
    userMessages.splice(messageIndex, 1);
    this.userMessages.set(activeUserId, userMessages);
    messageWrapper.destroy();
    } else {
      console.warn(`MessageWrapper with ID ${deletedMessage.id} not found.`);
    }
  }
}

