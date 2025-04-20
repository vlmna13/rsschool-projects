import "./meetingRoom.css";
import { Component } from "../../../utils/component";
import { MessageWrapper } from "./messageWrapper";

export class MeetingField extends Component<"div"> {
  constructor() {
    super({
      tag: "div",
      className: "meeting-field",
    });
  }

  public displayMessages(messages: any[]): void {
    this.destroyChildren();
    console.log("Displaying messages:", messages);
    messages.forEach((message) => {
      const messageElement = new MessageWrapper(message);
      this.appendElement(messageElement);
    });
  }

  public addMessages(messages: any[]): void {
    console.log("Adding messages:", messages);
    messages.forEach((message) => {
      const messageElement = new MessageWrapper(message);
      this.appendElement(messageElement);
    });
  }
}
