import "./loginView.css";
import { Component } from "../../utils/component";
import { FieldSet } from "./fieldsetComponent";
import { InfoButtonComponent } from "./infobuttonComponent";

export class LoginView extends Component<"form"> {
  constructor(mainComponent: Component<"main">) {
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
    const infoButton = new InfoButtonComponent(this.getNode());
    this.appendChildren([fieldSet, submitButton, infoButton]);
    mainComponent.destroyChildren();
    mainComponent.appendElement(this);
  }
}
