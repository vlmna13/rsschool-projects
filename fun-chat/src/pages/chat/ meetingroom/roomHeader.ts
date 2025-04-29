import "./meetingRoom.css";
import { Component } from "../../../utils/component";

export class RoomHeader extends Component<"div"> {
  private userInfo: Component<"p">;
  private circle: Component<"div"> | null = null; 
  private userLogin: Component<"p"> | null = null;
  constructor() {
    super({
      tag: "div",
      className: "room-header",
    });
    this.userInfo = new Component({
      tag: "p",
      className: "user-info",
      text: "Выбери c кем поделиться своим настроением",
    });
    this.appendChildren([this.userInfo]);
  }
  public chatWith(user: { login: string; isLogined: boolean }): void {
    this.destroyChildren();
    this.userInfo = new Component({
      tag: "p",
      className: "user-info",
      text: "шлю добро:     ",
    });
    this.circle = new Component({
      tag: "div",
      className: "circle",
      text: user.login[0].toUpperCase(),
    });
    if (user.isLogined) {
      this.circle.getNode().classList.add("user-active");
      this.circle.getNode().classList.remove("user-inactive");
    } else {
      this.circle.getNode().classList.add("user-inactive");
      this.circle.getNode().classList.remove("user-active");
    }
    const userLogin = new Component({
      tag: "p",
      className: "user-login",
      text: user.login,
    });
    this.appendChildren([this.userInfo, this.circle, userLogin]);
  }

  public updateUser(user: { login: string; isLogined: boolean }): void {
    if (this.circle) {
      this.circle.setTextContent(user.login[0].toUpperCase());
      if (user.isLogined) {
        this.circle.getNode().classList.add("user-active");
        this.circle.getNode().classList.remove("user-inactive");
      } else {
        this.circle.getNode().classList.add("user-inactive");
        this.circle.getNode().classList.remove("user-active");
      }
    }
    if (this.userLogin) {
      this.userLogin.setTextContent(user.login);
    }
  }
}
