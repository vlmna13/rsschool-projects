import "./usersManage.css";
import { Component } from "../../../utils/component";
// import type { WebSocketManager } from "../../../utils/webSocketManager";
import { UserListPanel } from "./userListPanel";
import { UserSearchInput } from "./userSearchInput";
import type { RoomHeader } from "../ meetingroom/roomHeader";
import type { MeetingField } from "../ meetingroom/meetingField";
import type { MeetingRoomWrapper } from "../ meetingroom/meetingRoomWrapper";
import type { MessageSendResponse } from "../../../utils/responceTypes";

export class UsersManage extends Component<"div"> {
  private userList: UserListPanel;
  private roomHeader: RoomHeader;
  private meetingField: MeetingField;
  // private wsManager: WebSocketManager;
  private meetingRoom: MeetingRoomWrapper;
  private users: {
    login: string;
    isLogined: boolean;
    messages?: any[];
    unreadCount?: number;
  }[] = [];
  constructor(
    // wsManager: WebSocketManager,
    users: { login: string; isLogined: boolean }[] = [],
    roomHeader: RoomHeader,
    meetingField: MeetingField,
    meetingRoom: MeetingRoomWrapper,
  ) {
    super({
      tag: "div",
      className: "users-manage-wrapper",
    });
    // this.wsManager = wsManager;
    this.users = users;
    this.roomHeader = roomHeader;
    this.meetingField = meetingField;
    this.meetingRoom = meetingRoom;
    this.userList = new UserListPanel([], (user) => this.handleChatWith(user));
    const userSearchInput = new UserSearchInput();
    this.appendChildren([userSearchInput, this.userList]);
    userSearchInput.getNode().addEventListener("input", (event) => {
      const target = event.target;
      if (target instanceof HTMLInputElement) {
        const searchText = target.value.trim().toLowerCase();
        this.filterUsers(searchText);
      }
    });
  }

  public updateUser(user: { login: string; isLogined: boolean }): void {
    this.userList.updateUser(user);
  }

  public setUsers(
    users: {
      login: string;
      isLogined: boolean;
      messages?: any[];
      unreadCount?: number;
    }[],
  ): void {
    this.users = users;
    this.userList.setUsers(users);
  }

  private handleChatWith(user: { login: string; isLogined: boolean }): void {
    this.roomHeader.chatWith(user);
    const userMessages: MessageSendResponse[] =
      this.users.find((u) => u.login === user.login)?.messages || [];
    this.meetingField.displayMessages(userMessages);
    this.meetingRoom.setActiveUser(user.login);
  }
  private filterUsers(searchText: string): void {
    if (!searchText) {
      this.userList.setUsers(this.users);
    } else {
      const filteredUsers = this.users.filter((user) =>
        user.login.toLowerCase().includes(searchText),
      );
      this.userList.setUsers(filteredUsers);
    }
  }
}
