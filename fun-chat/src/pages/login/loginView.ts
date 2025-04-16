import "./loginView.css";
import { Component } from "../../utils/component";
import { FieldSet } from "./fieldsetComponent";
import { router } from "../../utils/router";
import { InfoButtonComponent } from "./infobuttonComponent";
import type { WebSocketManager } from "../../utils/webSocketManager";
import { userState } from "../chat/userState";

export class LoginView extends Component<"form"> {
  private wsManager: WebSocketManager;
  private errorMessage: Component<"p">;
  private fieldSet: FieldSet;

  constructor(mainComponent: Component<"main">, wsManager: WebSocketManager) {
    super({
      tag: "form",
      className: "login-form",
    });
    this.wsManager = wsManager;
    const submitButton = new Component({
      tag: "button",
      className: "submit-button",
      text: "Войти",
    });
    submitButton.getNode().setAttribute("disabled", "true");
    submitButton.getNode().setAttribute("type", "submit");
    submitButton.addListener("click", (event) => this.handleSubmit(event));
    this.errorMessage = new Component({
      tag: "p",
      className: "error-message",
      text: "",
    });
    this.errorMessage.getNode().style.color = "red";
    this.errorMessage.getNode().style.display = "none";
    const infoButton = new InfoButtonComponent(mainComponent);
    this.fieldSet = new FieldSet((isValid) => {
      if (isValid) {
        submitButton.getNode().removeAttribute("disabled");
      } else {
        submitButton.getNode().setAttribute("disabled", "true");
      }
    });
    this.appendChildren([this.fieldSet, submitButton, infoButton]);
    mainComponent.destroyChildren();
    mainComponent.appendElement(this);
  }
  private async handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    const login = this.fieldSet.getLoginValue();
    const password = this.fieldSet.getPasswordValue();

    try {
      const response = await this.wsManager.sendRequest("USER_LOGIN", {
        user: {
          login,
          password,
        },
      });
      if ("user" in response && response.user.isLogined) {
        console.log("User logged in:", response.user.login);
        userState.setLogin(response.user.login);
        router.navigate("chat");
      } else {
        this.showError("Unexpected server response.");
      }
    } catch (error: any) {
      if (error.payload && error.payload.error) {
        this.showError(error.payload.error);
      } else {
        this.showError("Произошла ошибка. Попробуйте снова.");
      }
    }
  }

  private showError(message: string): void {
    this.errorMessage.getNode().textContent = message;
    this.errorMessage.getNode().style.display = "block";
  }
}
