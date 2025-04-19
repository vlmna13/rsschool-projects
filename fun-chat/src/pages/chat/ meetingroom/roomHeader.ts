import "./meetingRoom.css";
import { Component } from "../../../utils/component";

export class RoomHeader extends Component<"div"> {
  private userInfo: Component<"p">;
  constructor() {
    super({
      tag: "div",
      className: "room-header",
    });
    this.userInfo = new Component({
      tag: "p",
      className: "user-info",
      text: "No user selected",
    });
    this.appendChildren([this.userInfo]);
  }
  public updateUser(user: { login: string }): void {
    console.log("Updating RoomHeader with user:", user);
    this.userInfo.setTextContent(`Chatting with: ${user.login}`);
  }
}
