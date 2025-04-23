import "./usersManage.css";
import { Component } from "../../../utils/component";
import { UserElement } from "./userElement";

export class UserListPanel extends Component<"ul"> {
  private users: { login: string; isLogined: boolean; unreadCount?: number }[] =
    [];
  private onUserClick: (user: { login: string; isLogined: boolean }) => void;
  private selectedUserElement: UserElement | null = null;
  constructor(
    users: { login: string; isLogined: boolean }[] = [],
    onUserClick: (user: { login: string; isLogined: boolean }) => void,
  ) {
    super({
      tag: "ul",
      className: "user-list-panel",
    });
    this.onUserClick = onUserClick;
    this.setUsers(users);
    this.users = users;
    this.renderUsers();
  }
  public setUsers(
    users: { login: string; isLogined: boolean; unreadCount?: number }[],
  ): void {
    this.users = users;
    this.renderUsers();
  }

  public updateUser(user: {
    login: string;
    isLogined: boolean;
    unreadCount?: number;
  }): void {
    const existingUser = this.users.find((u) => u.login === user.login);

    if (existingUser) {
      existingUser.isLogined = user.isLogined;
      existingUser.unreadCount = user.unreadCount || 0;
    } else {
      this.users.push(user);
    }
    this.renderUsers();
  }

  public renderUsers(): void {
    this.destroyChildren();
    this.users.forEach((user) => {
      const userElement = new UserElement(
        user.login,
        user.isLogined,
        user.unreadCount || 0, // Передаем unreadCount
        (clickedUser) => {
          this.handleUserClick(userElement, clickedUser);
        },
      );
      this.appendElement(userElement);
    });
  }

  public getUsers(): { login: string; isLogined: boolean }[] {
    return this.users;
  }
  private handleUserClick(
    userElement: UserElement,
    user: { login: string; isLogined: boolean },
  ): void {
    if (this.selectedUserElement) {
      this.selectedUserElement.getNode().classList.remove("user-selected");
    }
    userElement.getNode().classList.add("user-selected");
    this.selectedUserElement = userElement;
    this.onUserClick(user);
  }
}
