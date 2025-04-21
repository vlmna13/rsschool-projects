import "./meetingRoom.css";
import { Component } from "../../../utils/component";
import { MessageWrapper } from "./messageWrapper";
import type { MessageManage } from "./messageManage";

export class MeetingField extends Component<"div"> {
  private messageManage: MessageManage | null = null;
  private messageWrappers: Map<string, MessageWrapper> = new Map(); // Хранит ссылки на MessageWrapper
  private emptyStateElement: Component<"p">;
  private separator: Component<"p">;

  constructor() {
    super({
      tag: "div",
      className: "meeting-field",
    });
    this.emptyStateElement = new Component({
      tag: "p",
      className: "empty-state",
      text: "Начать безудержное веселье",
    });
    this.separator = new Component({
      tag: "p",
      className: "separator",
      text: "Порция увеселительных сообщений",
    });
    this.getNode().addEventListener("scroll", this.handleScroll.bind(this));
  }
  public setMessageManage(messageManage: MessageManage): void {
    this.messageManage = messageManage;
  }

  public displayMessages(messages: any[]): void {
    this.destroyChildren();
    this.messageWrappers.clear();
    let firstUnreadMessageElement: HTMLElement | null = null;
    messages.forEach((message) => {
      if (!this.messageManage) {
        return;
      }
      const messageElement = new MessageWrapper(message, this.messageManage);
      this.messageWrappers.set(message.id, messageElement);
      this.appendElement(messageElement);
      const node = messageElement.getNode();
      if (
        !message.status.isReaded &&
        !firstUnreadMessageElement &&
        node instanceof HTMLElement
      ) {
        firstUnreadMessageElement = node;
      }
      if (firstUnreadMessageElement) {
        this.separator.getNode().style.display = "block";
        this.getNode().insertBefore(
          this.separator.getNode(),
          firstUnreadMessageElement,
        );
        firstUnreadMessageElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      } else {
        this.separator.getNode().style.display = "none";
      }
    });
  }

  public addMessages(messages: any[]): void {
    if (this.emptyStateElement) {
      this.emptyStateElement.destroy();
      // this.emptyStateElement = null;
    }
    messages.forEach((message) => {
      if (!this.messageManage) {
        return;
      }
      const messageElement = new MessageWrapper(message, this.messageManage);
      this.messageWrappers.set(message.id, messageElement);
      this.appendElement(messageElement);
    });
  }

  public getAllMessageElements(): MessageWrapper[] {
    return Array.from(this.messageWrappers.values());
  }

  public getMessageElementById(messageId: string): MessageWrapper | null {
    return this.messageWrappers.get(messageId) || null;
  }
  private handleScroll(): void {
    const node = this.getNode();
    if (node.scrollTop + node.clientHeight >= node.scrollHeight - 1) {
      console.log("Reached the bottom of the chat.");
      this.separator.getNode().style.display = "none";
    }
  }
}
