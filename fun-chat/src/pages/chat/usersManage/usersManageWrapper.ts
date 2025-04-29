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
  private meetingRoom: MeetingRoomWrapper;
  private users: {
    login: string;
    isLogined: boolean;
    messages?: any[];
    unreadCount?: number;
  }[] = [];
  constructor(
    users: { login: string; isLogined: boolean }[] = [],
    roomHeader: RoomHeader,
    meetingField: MeetingField,
    meetingRoom: MeetingRoomWrapper,
  ) {
    super({
      tag: "div",
      className: "users-manage-wrapper",
    });
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

  public updateUserStatus(login: string, isLogined: boolean): void {
    const user = this.users.find((u) => u.login === login);
    if (user) {
      user.isLogined = isLogined;
      this.userList.updateUser({
        login,
        isLogined,
        unreadCount: user.unreadCount,
      });
    } else {
      console.warn(`User ${login} not found while updating status.`);
    }
  }

  public updateUnreadCount(login: string, unreadCount: number): void {
    const user = this.users.find((u) => u.login === login);
    console.log("updateUnreadCount", login, unreadCount);
    if (user) {
      user.unreadCount = unreadCount;
      this.userList.updateUser({
        login,
        isLogined: user.isLogined,
        unreadCount: unreadCount || 0,
      });
    } else {
      console.warn(`User ${login} not found while updating unread count.`);
    }
  }

  public setUsers(
    users: {
      login: string;
      isLogined: boolean;
      messages?: any[];
      unreadCount?: number;
    }[],
  ): void {
    this.users = users.map((user) => ({
      ...user,
      unreadCount: user.unreadCount || 0,
    }));
    this.userList.setUsers(this.users);
  }

  private handleChatWith(user: { login: string; isLogined: boolean }): void {
    this.roomHeader.chatWith(user);
    const userMessages: MessageSendResponse[] =
      this.users.find((u) => u.login === user.login)?.messages || [];
    this.meetingField.displayMessages(userMessages);
    this.meetingRoom.setActiveUser(user.login);
    this.meetingRoom.getMessageManage().clearMessageInput();
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
