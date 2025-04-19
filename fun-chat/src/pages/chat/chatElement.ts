import "./chatView.css";
import "../../common.css";
import { Component } from "../../utils/component";
import type { WebSocketManager } from "../../utils/webSocketManager";
import { UsersManage } from "./usersManage/usersManageWrapper";
import { MeetingRoomWrapper } from "./ meetingroom/meetingRoomWrapper";
import { fetchAllUsers } from "./usersManage/functionFetchAllUsers";

export class ChatElement extends Component<"div"> {
  private wsManager: WebSocketManager;
  private users: { login: string; isLogined: boolean }[] = [];
  private usersManage: UsersManage;
  private meetingRoom: MeetingRoomWrapper;
  constructor(wsManager: WebSocketManager) {
    super({
      tag: "div",
      className: "chat-wrapper",
    });
    this.wsManager = wsManager;
    this.meetingRoom = new MeetingRoomWrapper(wsManager);
    const roomHeader = this.meetingRoom.getRoomHeader();
    this.usersManage = new UsersManage(wsManager, this.users, roomHeader);


    this.appendChildren([this.usersManage, this.meetingRoom]);
    this.loadUsers();
    this.subscribeToWebSocketEvents();
  }

  private async loadUsers(): Promise<void> {
    console.log("Calling fetchAllUsers...");

    try {
      const allUsers = await fetchAllUsers(this.wsManager);
      this.users = allUsers;
      this.usersManage.setUsers(this.users);
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  }


  private subscribeToWebSocketEvents(): void {
    console.log("Subscribing to WebSocket events...");
    this.wsManager.addEventHandler("USER_EXTERNAL_LOGOUT", (payload: any) => {
      console.log("Handling USER_EXTERNAL_LOGOUT event...");
      if (payload && payload.user) {
        this.meetingRoom.getRoomHeader().updateUser({
          login: payload.user.login,
          isLogined: false, // Пользователь вышел, статус неактивен
        });        this.usersManage.updateUser({
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
