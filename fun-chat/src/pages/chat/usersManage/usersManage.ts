import "./usersManage.css";
import { Component } from "../../../utils/component";
import type { WebSocketManager } from "../../../utils/webSocketManager";
import { fetchAllUsers } from "./functionFetchAllUsers";
import { UserListPanel } from "./userListPanel";

export class UsersManage extends Component<"div"> {
  private wsManager: WebSocketManager;
  private users: { login: string; isLogined: boolean }[] = [];
  private userList: UserListPanel;
  constructor(wsManager: WebSocketManager) {
    super({
      tag: "div",
      className: "users-manage-wrapper",
    });
    this.wsManager = wsManager;
    this.userList = new UserListPanel([]);
    this.appendChildren([this.userList]);
    this.loadUsers();
  }

  private async loadUsers(): Promise<void> {
    try {
      const allUsers = await fetchAllUsers(this.wsManager);
      this.users = allUsers;
      this.userList.setUsers(this.users);
      console.log("Users loaded successfully:", this.users);
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  }
}
