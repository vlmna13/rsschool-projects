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
  private users: { login: string; isLogined: boolean }[] = [];
  private usersManage: UsersManage;
  private meetingRoom: MeetingRoomWrapper;
  private userMessages: Map<string, any[]> = new Map(); // Хранилище сообщений для каждого пользователя

  constructor(wsManager: WebSocketManager) {
    super({
      tag: "div",
      className: "chat-wrapper",
    });
    this.wsManager = wsManager;
    this.meetingRoom = new MeetingRoomWrapper(wsManager);
    const roomHeader = this.meetingRoom.getRoomHeader();
    const meetingField = this.meetingRoom.getMeetingField();
    this.usersManage = new UsersManage(
      wsManager,
      this.users,
      roomHeader,
      meetingField,
      this.meetingRoom,
    );

    this.appendChildren([this.usersManage, this.meetingRoom]);
    this.loadUsers();
    this.subscribeToWebSocketEvents();
  }

  public getUserMessages(login: string): any[] {
    return this.userMessages.get(login) || [];
  }

  private async loadUsers(): Promise<void> {
    try {
      const allUsers = await fetchAllUsers(this.wsManager);
      this.users = allUsers;
      const messagesByUser = await fetchAllMessages(this.wsManager, this.users);
      const usersWithMessages = this.users.map((user) => {
        const userMessages =
          messagesByUser.find((u) => u.login === user.login)?.messages || [];
        const unreadCount = userMessages.filter(
          (msg) => !msg.status.isReaded,
        ).length;
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
}
