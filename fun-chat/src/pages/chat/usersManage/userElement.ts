import "./usersManage.css";
import "../chatView.css";
import { Component } from "../../../utils/component";

export class UserElement extends Component<"li"> {
  constructor(login: string, isLogined: boolean,
    onClick: (user: { login: string; isLogined: boolean }) => void

  ) {
    super({
      tag: "li",
      className: "user-element",
    });
    const userStatus = new Component({
      tag: "span",
      className: "circle",
      text: login[0].toUpperCase(),
    });
    if (isLogined) {
      userStatus.toggleClass("user-active");
    } else {
      userStatus.toggleClass("user-inactive");
    }
    const userName = new Component({
      tag: "span",
      className: "user-name",
      text: login,
    });
    this.getNode().dataset.login = login;
    this.appendChildren([userStatus, userName]);
    this.getNode().addEventListener("click", () => {
      onClick({ login, isLogined });
    });
  }
}
