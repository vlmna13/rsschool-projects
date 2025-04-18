import "./usersManage.css";
import { Component } from "../../../utils/component";

export class UserSearchInput extends Component<"input"> {
  constructor() {
    super({
      tag: "input",
      className: "user-search-input",
    });
    this.getNode().setAttribute("type", "text");
    this.getNode().setAttribute("placeholder", "Search for users");
  }
}
