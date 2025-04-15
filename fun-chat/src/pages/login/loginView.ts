import "./loginView.css";
import { Component } from "../../utils/component";
import { FieldSet } from "./fieldsetComponent";

export class loginView extends Component<"form"> {
  constructor() {
    super({
      tag: "form",
      className: "login-form",
    });
    const submitButton = new Component({
      tag: "button",
      className: "submit-button",
      text: "Войти",
    });
    submitButton.getNode().setAttribute("disabled", "true");
    submitButton.getNode().setAttribute("type", "submit");

    const fieldSet = new FieldSet((isValid) => {
      if (isValid) {
        submitButton.getNode().removeAttribute("disabled");
      } else {
        submitButton.getNode().setAttribute("disabled", "true");
      }
    });

    this.appendChildren([fieldSet, submitButton]);
  }
}
