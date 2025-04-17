import "./chatView.css";
import "../../common.css";
import { Component } from "../../utils/component";
import { ChatHeader } from "./chatHeader";
import type { WebSocketManager } from "../../utils/webSocketManager";
import { userState } from "./userState";
import { router } from "../../utils/router";

export class ChatView extends Component<"div"> {
  private wsManager: WebSocketManager;
  constructor(mainComponent: Component<"main">, wsManager: WebSocketManager) {
    super({
      tag: "div",
      className: "chatview-wrapper",
    });
    this.wsManager = wsManager;
    const userLogin = userState.getLogin();
    if (!userLogin) {
      console.warn("User is not logged in. Redirecting to login...");
      router.navigate("login");
      return;
    }
    const chatHeader = new ChatHeader(userLogin, mainComponent);
    this.appendChildren([chatHeader]);
    mainComponent.destroyChildren();
    mainComponent.appendElement(this);
  }
}
