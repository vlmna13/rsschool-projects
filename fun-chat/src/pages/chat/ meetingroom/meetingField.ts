import "./meetingRoom.css";
import { Component } from "../../../utils/component";
import { MessageWrapper } from "./messageWrapper";
import type { MessageManage } from "./messageManage";
// import type { MessageReadRequest } from "../../../utils/requestTypes";
// import type { MessageReadResponse } from "../../../utils/responceTypes";
// import type { WebSocketManager } from "../../../utils/webSocketManager";

export class MeetingField extends Component<"div"> {
  private messageManage: MessageManage | null = null;
  private messageWrappers: Map<string, MessageWrapper> = new Map(); // Хранит ссылки на MessageWrapper
  private emptyStateElement: Component<"p">;
  private separator: Component<"p">;
  // private wsManager: WebSocketManager;

  constructor() {
    super({
      tag: "div",
      className: "meeting-field",
    });
    // this.wsManager= wsManager;
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
    const node = this.getNode();
    if (node) {
      node.addEventListener("scroll", this.handleScroll);
      node.addEventListener("click", this.handleClick);
    }
  }
  public setMessageManage(messageManage: MessageManage): void {
    this.messageManage = messageManage;
  }

  public displayMessages(messages: any[]): void {
    this.destroyChildren();
    this.messageWrappers.clear();

    if (messages.length === 0) {
      this.emptyStateElement.getNode().style.display = "block";
      this.appendElement(this.emptyStateElement);
      return;
    }

    this.emptyStateElement.getNode().style.display = "none";

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
    if (messages.length > 0) {
      this.emptyStateElement.getNode().style.display = "none";
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
  public markMessagesAsRead(messageIds: string[]): void {
    messageIds.forEach((id) => {
      const messageWrapper = this.getMessageElementById(id);
      if (messageWrapper) {
        messageWrapper.markAsRead();
      }
    });
  }
  public async markAllUnreadMessagesAsRead(): Promise<void> {

    const unreadMessages = Array.from(this.messageWrappers.values()).filter(
      (messageWrapper) => !messageWrapper.message.status.isReaded,
    );
  
    const unreadMessageIds = unreadMessages.map(
      (messageWrapper) => messageWrapper.message.id,
    );
  
    if (unreadMessageIds.length > 0) {
      if (!this.messageManage) {
        console.error("MessageManage is not set.");
        return;
      }
        await this.messageManage.markMessagesAsRead(unreadMessageIds);
        this.markMessagesAsRead(unreadMessageIds);
    }
      this.separator.getNode().style.display = "none";
  }

  private handleScroll= (): void=> {
    const node = this.getNode();    
    if (node.scrollTop + node.clientHeight >= node.scrollHeight - 1) {
      this.separator.getNode().style.display = "none";
      this.markAllUnreadMessagesAsRead();
    }
  }
  private handleClick = (): void => {
    this.markAllUnreadMessagesAsRead();
  };
  
}
