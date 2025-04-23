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

      // Определяем первое непрочитанное сообщение
      if (!message.status.isReaded && !firstUnreadMessageElement) {
        firstUnreadMessageElement = messageElement.getNode();
      }
    });

    const containerNode = this.getNode();

    if (firstUnreadMessageElement) {
      this.separator.getNode().style.display = "block";
      containerNode.insertBefore(
        this.separator.getNode(),
        firstUnreadMessageElement,
      );

      // Прокручиваем к сепаратору
      this.separator.getNode().scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    } else {
      this.separator.getNode().style.display = "none";
    }
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
      if (message.status.isReaded) {
        messageElement.updateStatus(false, true);
      }
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
    if (!this.messageManage) {
      return;
    }

    const currentUser = JSON.parse(
      sessionStorage.getItem("user") || "{}",
    ).login;
    const activeUserId = this.messageManage.getActiveUserId();

    if (activeUserId === currentUser) {
      return;
    }

    const unreadMessages = Array.from(this.messageWrappers.values()).filter(
      (messageWrapper) =>
        !messageWrapper.message.status.isReaded &&
        messageWrapper.message.from !== currentUser,
    );

    const unreadMessageIds = unreadMessages.map(
      (messageWrapper) => messageWrapper.message.id,
    );

    if (unreadMessageIds.length > 0) {
      this.messageManage.markMessagesAsRead(unreadMessageIds);
    }
    this.separator.getNode().style.display = "none";
  }

  private handleScroll = (): void => {
    const currentUser = JSON.parse(
      sessionStorage.getItem("user") || "{}",
    ).login;
    if (!this.messageManage) {
      return;
    }
    const activeUserId = this.messageManage.getActiveUserId();

    if (activeUserId === currentUser) {
      return;
    }
    const node = this.getNode();
    if (node.scrollTop + node.clientHeight >= node.scrollHeight - 1) {
      this.separator.getNode().style.display = "none";
      this.markAllUnreadMessagesAsRead();
    }
  };
  private handleClick = (): void => {
    this.markAllUnreadMessagesAsRead();
  };
}
