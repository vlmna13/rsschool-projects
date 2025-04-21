import "./meetingRoom.css";
import { Component } from "../../../utils/component";
import { MessageWrapper } from "./messageWrapper";
import type { MessageManage } from "./messageManage";

export class MeetingField extends Component<"div"> {
  private messageManage: MessageManage | null = null;
  private messageWrappers: Map<string, MessageWrapper> = new Map(); // Хранит ссылки на MessageWrapper

  constructor() {
    super({
      tag: "div",
      className: "meeting-field",
    });
  }
  public setMessageManage(messageManage: MessageManage): void {
    this.messageManage = messageManage;
  }

  public displayMessages(messages: any[]): void {
    this.destroyChildren();
    this.messageWrappers.clear();
    messages.forEach((message) => {
      if (!this.messageManage) {
        return;
      }
      const messageElement = new MessageWrapper(message, this.messageManage);
      this.messageWrappers.set(message.id, messageElement); // Сохраняем ссылку на MessageWrapper
      this.appendElement(messageElement);
    });
  }

  public addMessages(messages: any[]): void {
    messages.forEach((message) => {
      if (!this.messageManage) {
        return;
      }
      const messageElement = new MessageWrapper(message, this.messageManage);
      this.messageWrappers.set(message.id, messageElement); // Сохраняем ссылку на MessageWrapper
      this.appendElement(messageElement);
    });
  }

  public getAllMessageElements(): MessageWrapper[] {
    return Array.from(this.messageWrappers.values());
  }

  public getMessageElementById(messageId: string): MessageWrapper | null {
    return this.messageWrappers.get(messageId) || null;
  }
}
