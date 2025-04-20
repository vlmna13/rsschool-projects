import "./meetingRoom.css";
import { Component } from "../../../utils/component";
import { MessageWrapper } from "./messageWrapper";
import type { MessageManage } from "./messageManage";

export class MeetingField extends Component<"div"> {
  private messageManage: MessageManage | null = null;

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
    messages.forEach((message) => {
      if (!this.messageManage) {
        return;
      }
      const messageElement = new MessageWrapper(message, this.messageManage);
      this.appendElement(messageElement);
    });
  }

  public addMessages(messages: any[]): void {
    messages.forEach((message) => {
      if (!this.messageManage) {
        return;
      }
      const messageElement = new MessageWrapper(message, this.messageManage);
      this.appendElement(messageElement);
    });
  }
}
