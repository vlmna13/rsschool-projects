import "./chatView.css";
import "../../common.css";
import { Component } from "../../utils/component";
import type { WebSocketManager } from "../../utils/webSocketManager";
import { UsersManage } from "./usersManage/usersManageWrapper";
import { MeetingRoomWrapper } from "./ meetingroom/meetingRoomWrapper";
import { fetchAllUsers } from "./usersManage/functionFetchAllUsers";
import { fetchAllMessages } from "./usersManage/functionFetchAllMessages";

export class ChatElement extends Component<"div"> {
  private wsManager: WebSocketManager;
  private users: { login: string; isLogined: boolean; unreadCount?: number }[] =
    [];
  private usersManage: UsersManage;
  private meetingRoom: MeetingRoomWrapper;
  private userMessages: Map<string, any[]> = new Map(); // Хранилище сообщений для каждого пользователя

  constructor(wsManager: WebSocketManager) {
    super({
      tag: "div",
      className: "chat-wrapper",
    });
    this.wsManager = wsManager;
    this.meetingRoom = new MeetingRoomWrapper(wsManager, this.userMessages);
    const roomHeader = this.meetingRoom.getRoomHeader();
    const meetingField = this.meetingRoom.getMeetingField();
    this.usersManage = new UsersManage(
      // wsManager,
      this.users,
      roomHeader,
      meetingField,
      this.meetingRoom,
    );

    this.appendChildren([this.usersManage, this.meetingRoom]);
    this.loadUsers();
    this.subscribeToWebSocketEvents();
    this.subscribeToMessageDeliver();
    this.subscribeToMessageSend();
  }

  public getUserMessages(login: string): any[] {
    return this.userMessages.get(login) || [];
  }

  private async loadUsers(): Promise<void> {
    try {
      const allUsers = await fetchAllUsers(this.wsManager);
      this.users = allUsers;
      const messagesByUser = await fetchAllMessages(this.wsManager, this.users);
      console.log("messagesByUser", messagesByUser);
      const usersWithMessages = this.users.map((user) => {
        const userMessages =
          messagesByUser.find((u) => u.login === user.login)?.messages || [];
        const unreadCount = userMessages.filter(
          (msg) => !msg.status.isReaded,
        ).length;
        console.log("unreadCount", unreadCount);
        this.meetingRoom.addMessages(user.login, userMessages);
        return { ...user, messages: userMessages, unreadCount };
      });
      this.usersManage.setUsers(usersWithMessages);
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  }

  private subscribeToWebSocketEvents(): void {
    this.wsManager.addEventHandler("USER_EXTERNAL_LOGOUT", (payload: any) => {
      if (payload && payload.user) {
        this.meetingRoom.getRoomHeader().updateUser({
          login: payload.user.login,
          isLogined: false, // Пользователь вышел, статус неактивен
        });
        this.usersManage.updateUser({
          login: payload.user.login,
          isLogined: payload.user.isLogined,
        });
      } else {
        console.error("Invalid payload for USER_EXTERNAL_LOGOUT:", payload);
      }
    });
    this.wsManager.addEventHandler("USER_EXTERNAL_LOGIN", (payload: any) => {
      if (payload && payload.user) {
        this.usersManage.updateUser({
          login: payload.user.login,
          isLogined: payload.user.isLogined,
        });
        this.meetingRoom.getRoomHeader().updateUser({
          login: payload.user.login,
          isLogined: true,
        });
      } else {
        console.error("Invalid payload for USER_EXTERNAL_LOGIN:", payload);
      }
    });
  }

  private subscribeToMessageDeliver(): void {
    this.wsManager.addEventHandler("MSG_DELIVER", (payload: any) => {
      const { message } = payload;
      console.log("Received MSG_DELIVER event:", payload);

      if (!message || !message.status || !message.status.isDelivered) {
        console.error("Invalid payload for MSG_DELIVER:", payload);
        return;
      }

      const activeUserId = this.meetingRoom.getActiveUserId();
      if (!activeUserId) {
        console.error("Active user ID is null.");
        return;
      }

      const userMessages =
        this.meetingRoom.userMessages.get(activeUserId) || [];
      const messageIndex = userMessages.findIndex(
        (msg) => msg.id === message.id,
      );
      userMessages[messageIndex].status.isDelivered = true;
      this.meetingRoom.userMessages.set(activeUserId, userMessages);
      const messageWrapper = this.meetingRoom
        .getMeetingField()
        .getMessageElementById(message.id);
      if (messageWrapper) {
        messageWrapper.updateStatus(false, true);
        console.log(`Message ${message.id} marked as delivered in UI.`);
      } else {
        console.warn(`MessageWrapper with ID ${message.id} not found.`);
      }
    });
  }

  private subscribeToMessageSend(): void {
    this.wsManager.addEventHandler("MSG_SEND", (payload: any) => {
      const { message } = payload;

      if (!message || !message.to) {
        console.error("Invalid payload for MSG_SEND:", payload);
        return;
      }

      const currentUser = JSON.parse(
        sessionStorage.getItem("user") || "{}",
      ).login;

      if (message.to !== currentUser) {
        console.log("Message is not addressed to the current user.");
        return;
      }
      const userMessages =
        this.meetingRoom.userMessages.get(message.from) || [];
      userMessages.push(message);
      this.meetingRoom.userMessages.set(message.from, userMessages);
      const activeUserId = this.meetingRoom.getActiveUserId();
      if (activeUserId === message.from) {
        this.meetingRoom.getMeetingField().addMessages([message]);

        const allMessages = this.meetingRoom
          .getMeetingField()
          .getAllMessageElements();
        const lastMessageElement =
          allMessages.length > 0
            ? allMessages[allMessages.length - 1].getNode()
            : null;

        if (lastMessageElement) {
          lastMessageElement.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }
      } else {
        console.log(
          `Message from ${message.from} is not for the active chat. Saved to history.`,
        );
      }
    });
  }
}
