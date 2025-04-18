import "./chatView.css";
import { Component } from "../../utils/component";
import { InfoButtonComponent } from "../login/infobuttonComponent";
import type { WebSocketManager } from "../../utils/webSocketManager";
import type { UserLogoutRequest } from "../../utils/requestTypes";

type User = {
  login: string;
  password: string;
  isLogined: boolean;
};

export class ChatHeader extends Component<"div"> {
  private wsManager: WebSocketManager;
  private user: User;
  constructor(
    user: User,
    mainComponent: Component<"main">,
    wsManager: WebSocketManager,
  ) {
    super({
      tag: "div",
      className: "chat-header",
    });
    this.wsManager = wsManager;
    this.user = user;
    const circle = new Component({
      tag: "div",
      className: "circle",
      text: user.login[0].toUpperCase(),
    });
    const chatTitle = new Component({
      tag: "h3",
      className: "chat-title",
      text: user.login,
    });

    const buttonExit = new Component({
      tag: "button",
      className: "exit-button",
      text: "Перестать веселиться",
    });
    buttonExit.addListener("click", () => {
      this.exit();
    });
    const buttonWrapper = new Component({
      tag: "div",
      className: "buttons-wrapper",
    });
    const infoButton = new InfoButtonComponent(mainComponent);
    buttonWrapper.appendChildren([buttonExit, infoButton]);
    this.appendChildren([circle, chatTitle, buttonWrapper]);
  }

  private async exit(): Promise<void> {
    try {
      const logoutRequest: UserLogoutRequest = {
        user: {
          login: this.user.login,
          password: this.user.password,
        },
      };
      await this.wsManager.sendRequest("USER_LOGOUT", logoutRequest);
      console.log("User logged out:", this.user.login);
    } catch (error) {
      console.error("Failed to notify server about logout:", error);
    }
    sessionStorage.removeItem("user");
    location.reload();
  }
}
