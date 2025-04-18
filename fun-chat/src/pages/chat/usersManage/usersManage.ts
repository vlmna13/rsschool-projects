import "./usersManage.css";
import { Component } from "../../../utils/component";
import type { WebSocketManager } from "../../../utils/webSocketManager";
import { fetchAllUsers } from "./functionFetchAllUsers";
import { UserListPanel } from "./userListPanel";
import { UserSearchInput } from "./userSearchInput";

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
    this.loadUsers();
    const userSearchInput = new UserSearchInput();
    this.appendChildren([userSearchInput, this.userList]);
    userSearchInput.getNode().addEventListener("input", (event) => {
      const target = event.target;
      if (target instanceof HTMLInputElement) {
        const searchText = target.value.trim().toLowerCase();
        this.filterUsers(searchText);
      }
    });
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
  private filterUsers(searchText: string): void {
    if (!searchText) {
      this.userList.setUsers(this.users);
    } else {
      const filteredUsers = this.users.filter((user) =>
        user.login.toLowerCase().includes(searchText)
      );
      this.userList.setUsers(filteredUsers);
    }
  }
}
