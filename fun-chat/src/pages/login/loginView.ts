import "./loginView.css";
import { Component } from "../../utils/component";
import { FieldSet } from "./fieldsetComponent";
import { router } from "../../utils/router";
import { InfoButtonComponent } from "./infobuttonComponent";
import type { WebSocketManager } from "../../utils/webSocketManager";
import type { ErrorResponse } from "../../utils/responceTypes";

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
      text: "Начать веселье",
    });
    submitButton.getNode().setAttribute("disabled", "true");
    submitButton.getNode().setAttribute("type", "submit");
    submitButton.addListener("click", (event) => this.handleSubmit(event));
    this.errorMessage = new Component({
      tag: "p",
      className: "error-message-log",
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
    this.appendChildren([
      this.fieldSet,
      submitButton,
      infoButton,
      this.errorMessage,
    ]);
    this.fieldSet.getLoginInput().addInputListener(() => this.hideError());
    this.fieldSet.getPasswordInput().addInputListener(() => this.hideError());
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
      if ("error" in response) {
        this.handleErrorResponse(response);
        return;
      }

      if ("user" in response && response.user.isLogined) {
        const user = {
          login: response.user.login,
          password,
          isLogined: response.user.isLogined,
        };
        sessionStorage.setItem("user", JSON.stringify(user));
        router.navigate("chat");
      } else {
        throw new Error("Unexpected server response.");
      }
    } catch (error: any) {
      this.showError(error.message || "Произошла ошибка. Попробуйте снова.");
    }
  }
  private showError(message: string): void {
    this.errorMessage.getNode().textContent = message;
    this.errorMessage.getNode().style.display = "block";
  }
  private handleErrorResponse(response: ErrorResponse): void {
    switch (response.error) {
      case "a user with this login is already authorized":
        this.showError("Пользователь с указанным логином уже вошел в систему.");
        break;
      case "another user is already authorized in this connection":
        this.showError(
          "Другой пользователь уже авторизован в этом соединении.",
        );
        break;
      case "incorrect password":
        this.showError(
          "Предоставленный пароль не соответствует указанному логину.",
        );
        break;
      default:
        this.showError("Произошла ошибка. Попробуйте снова.");
        break;
    }
  }
  private hideError(): void {
    this.errorMessage.getNode().textContent = "";
    this.errorMessage.getNode().style.display = "none";
  }
}
