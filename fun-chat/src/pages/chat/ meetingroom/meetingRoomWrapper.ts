import { Component } from "../../../utils/component";
import { RoomHeader } from "./roomHeader";
import "./meetingRoom.css";
import type { WebSocketManager } from "../../../utils/webSocketManager";

export class MeetingRoomWrapper extends Component<"div"> {
  private roomHeader: RoomHeader;
  private wsManager: WebSocketManager;
  constructor(wsManager: WebSocketManager) {
    super({
      tag: "div",
      className: "meetingroom-wrapper",
    });
    this.wsManager = wsManager;
    this.roomHeader = new RoomHeader();
    this.appendChildren([this.roomHeader]);
  }

  public getRoomHeader(): RoomHeader {
    return this.roomHeader;
  }

  // private async handleUserClick(login: string): Promise<void> {
  //   try {
  //     const response: any = await this.wsManager.sendRequest<any, any>(
  //       "MSG_FROM_USER",
  //       {
  //         id: crypto.randomUUID(),
  //         type: "MSG_FROM_USER",
  //         payload: { user: { login } },
  //       },
  //     );

  //     console.log("Message history:", response.payload.messages);

  //     // Обновляем RoomHeader
  //     this.roomHeader.updateUser({ login });
  //   } catch (error) {
  //     console.error("Failed to fetch user data:", error);
  //   }
  // }
}
