import "./loginView.css";
import { Component } from "../../utils/component";
import { InputComponent } from "./inputComponent";
import { validateLogin, validatePassword } from "./functionsValidate";

export class FieldSet extends Component<"fieldset"> {
  private loginInput: InputComponent;
  private passwordInput: InputComponent;
  private isValid: boolean = false;
  private errorMessage: Component<"p">;

  constructor(private onValidationChange: (isValid: boolean) => void) {
    super({
      tag: "fieldset",
      className: "login-fieldset",
    });
    const legend = new Component({
      tag: "legend",
      className: "login-legend",
      text: "Авторизация",
    });
    this.loginInput = new InputComponent(
      "Логин",
      "Введите логин",
      "text",
      "input-wrapper",
      "input-label",
      "input-field",
      "error-message",
    );
    this.passwordInput = new InputComponent(
      "Пароль",
      "Введите пароль",
      "password",
      "input-wrapper",
      "input-label",
      "input-field",
      "error-message",
    );
    this.errorMessage = new Component({
      tag: "p",
      className: "error-message",
      text: "",
    });
    this.errorMessage.getNode().style.color = "red";
    this.errorMessage.getNode().style.display = "none";

    this.appendChildren([
      legend,
      this.loginInput,
      this.passwordInput,
      this.errorMessage,
    ]);
    this.loginInput.addInputListener(() => this.updateValidationState());
    this.passwordInput.addInputListener(() => this.updateValidationState());
  }

  public getLoginValue(): string {
    return this.loginInput.getValue();
  }

  public getPasswordValue(): string {
    return this.passwordInput.getValue();
  }
  public getLoginInput(): InputComponent {
    return this.loginInput;
  }

  public getPasswordInput(): InputComponent {
    return this.passwordInput;
  }

  private updateValidationState(): void {
    const loginValue = this.loginInput.getValue();
    const passwordValue = this.passwordInput.getValue();

    const isLoginValid = validateLogin(loginValue);
    const isPasswordValid = validatePassword(passwordValue);

    if (!isLoginValid) {
      this.loginInput.showError("Логин должен быть длиннее 4 символов");
    } else {
      this.loginInput.clearError();
    }

    if (!isPasswordValid) {
      this.passwordInput.showError(
        "Пароль должен быть длиннее 4 символов и содержать заглавную букву",
      );
    } else {
      this.passwordInput.clearError();
    }

    const isValid = isLoginValid && isPasswordValid;

    if (this.isValid !== isValid) {
      this.isValid = isValid;
      this.onValidationChange(this.isValid);
    }
  }
}
