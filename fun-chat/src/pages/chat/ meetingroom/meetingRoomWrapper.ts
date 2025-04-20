import { Component } from "../../../utils/component";
import { RoomHeader } from "./roomHeader";
import "./meetingRoom.css";
import type { WebSocketManager } from "../../../utils/webSocketManager";
import { MeetingField } from "./meetingField";
import { MessageManage } from "./messageManage";
import type { MessageSendResponse } from "../../../utils/responceTypes";

export class MeetingRoomWrapper extends Component<"div"> {
  private roomHeader: RoomHeader;
  private wsManager: WebSocketManager;
  private meetingField: MeetingField;
  private messageManage: MessageManage;
  private activeUserId: string | null = null; // Хранит id текущего пользователя
  private userMessages: Map<string, MessageSendResponse["message"][]>;

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
    this.appendChildren([
      this.roomHeader,
      this.meetingField,
      this.messageManage,
    ]);
  }

  public getActiveUserId(): string | null {
    return this.activeUserId;
  }

  public setActiveUser(userId: string): void {
    this.activeUserId = userId;
    console.log(`Active user set to: ${userId}`);
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
}
