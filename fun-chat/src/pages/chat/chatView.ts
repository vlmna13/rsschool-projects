import "./chatView.css";
import "../../common.css";
import { Component } from "../../utils/component";
import { ChatHeader } from "./chatHeader";
import type { WebSocketManager } from "../../utils/webSocketManager";
import { router } from "../../utils/router";
import { ChatElement } from "./chatElement";

export class ChatView extends Component<"div"> {
  constructor(mainComponent: Component<"main">, wsManager: WebSocketManager) {
    super({
      tag: "div",
      className: "chatview-wrapper",
    });
    const savedUser = sessionStorage.getItem("user");
    if (!savedUser) {
      console.warn("User is not logged in. Redirecting to login...");
      router.navigate("login");
      return;
    }
    const user = JSON.parse(savedUser);
    const chatHeader = new ChatHeader(user, mainComponent, wsManager);
    const chatElement = new ChatElement(wsManager);
    this.appendChildren([chatHeader, chatElement]);
    mainComponent.destroyChildren();
    mainComponent.appendElement(this);
  }
}
