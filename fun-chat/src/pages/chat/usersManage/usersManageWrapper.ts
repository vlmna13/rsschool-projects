import "./usersManage.css";
import { Component } from "../../../utils/component";
import type { WebSocketManager } from "../../../utils/webSocketManager";
import { UserListPanel } from "./userListPanel";
import { UserSearchInput } from "./userSearchInput";
import type { RoomHeader } from "../ meetingroom/roomHeader";

export class UsersManage extends Component<"div"> {
  private userList: UserListPanel;
  private roomHeader: RoomHeader;

  private wsManager: WebSocketManager;
  private users: { login: string; isLogined: boolean }[] = [];
  constructor(
    wsManager: WebSocketManager,
    users: { login: string; isLogined: boolean }[] = [],
    roomHeader: RoomHeader
  ) {
    super({
      tag: "div",
      className: "users-manage-wrapper",
    });
    this.wsManager = wsManager;
    this.users = users;
    this.roomHeader = roomHeader;
    this.userList = new UserListPanel([], (user) => this.handleChatWith(user));
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

  public updateUser(user: { login: string; isLogined: boolean }): void {
    this.userList.updateUser(user);
  }

  public setUsers(users: { login: string; isLogined: boolean }[]): void {
    this.users = users;
    this.userList.setUsers(users);
  }

  private handleChatWith(user: { login: string; isLogined: boolean }): void {
    console.log("User clicked:", user);
    this.roomHeader.chatWith(user);
  }

  private filterUsers(searchText: string): void {
    if (!searchText) {
      this.userList.setUsers(this.users);
    } else {
      const filteredUsers = this.users.filter((user) =>
        user.login.toLowerCase().includes(searchText),
      );
      this.userList.setUsers(filteredUsers);
    }
  }
}
