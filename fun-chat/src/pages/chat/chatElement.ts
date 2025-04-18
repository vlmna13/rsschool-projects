import "./chatView.css";
import "../../common.css";
import { Component } from "../../utils/component";
import type { WebSocketManager } from "../../utils/webSocketManager";
import { UsersManage } from "./usersManage/usersManage";

export class ChatElement extends Component<"div"> {
  private wsManager: WebSocketManager;
  constructor(wsManager: WebSocketManager) {
    super({
      tag: "div",
      className: "chat-wrapper",
    });
    this.wsManager = wsManager;
    const usersManage = new UsersManage(wsManager);
    this.appendChildren([usersManage]);
  }
}
