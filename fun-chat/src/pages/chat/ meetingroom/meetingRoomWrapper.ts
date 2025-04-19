import { Component } from "../../../utils/component";
import { RoomHeader } from "./roomHeader";
import "./meetingRoom.css";
import type { WebSocketManager } from "../../../utils/webSocketManager";
import { MeetingField } from "./meetingField";

export class MeetingRoomWrapper extends Component<"div"> {
  private roomHeader: RoomHeader;
  private wsManager: WebSocketManager;
  private meetingField: MeetingField;
  constructor(wsManager: WebSocketManager) {
    super({
      tag: "div",
      className: "meetingroom-wrapper",
    });
    this.wsManager = wsManager;
    this.roomHeader = new RoomHeader();
    this.meetingField = new MeetingField();
    this.appendChildren([this.roomHeader, this.meetingField]);
  }

  public getRoomHeader(): RoomHeader {
    return this.roomHeader;
  }
  public getMeetingField(): MeetingField {
    return this.meetingField;
  }
}
