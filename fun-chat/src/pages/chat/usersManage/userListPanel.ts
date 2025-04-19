import "./usersManage.css";
import { Component } from "../../../utils/component";
import { UserElement } from "./userElement";

export class UserListPanel extends Component<"ul"> {
  private users: { login: string; isLogined: boolean }[] = [];
  private onUserClick: (user: { login: string; isLogined: boolean }) => void;
  constructor(users: { login: string; isLogined: boolean }[] = [],
    onUserClick: (user: { login: string; isLogined: boolean }) => void

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
  public setUsers(users: { login: string; isLogined: boolean }[]): void {
    this.users = users;
    this.renderUsers();
  }

  public updateUser(user: { login: string; isLogined: boolean }): void {
    const existingUser = this.users.find((u) => u.login === user.login);
    if (existingUser) {
      existingUser.isLogined = user.isLogined;
    } else {
      this.users.push(user);
    }
    this.renderUsers();
  }

  public renderUsers(): void {
    this.destroyChildren();
    this.users.forEach((user) => {
      const userElement = new UserElement(user.login, user.isLogined, this.onUserClick);
      this.appendElement(userElement);
    });
  }
}
