import { createElement } from "../../../utils/createElement";
import "./raceControlButtons.css";

export class RaceControlButtons {
  private wrapper: HTMLDivElement;
  private startButton: HTMLButtonElement;
  private resetButton: HTMLButtonElement;
  private generateCarsButton: HTMLButtonElement;

  constructor() {
    this.wrapper = createElement<HTMLDivElement>({
      tag: "div",
      classNames: ["wrapper-race-controls"],
    });
    this.startButton = this.createStartRaceButton();
    this.resetButton = this.createResetRaceButton();
    this.generateCarsButton = this.createGenerateCarsButton();
    this.wrapper.append(
      this.startButton,
      this.resetButton,
      this.generateCarsButton,
    );
  }

  private createStartRaceButton(): HTMLButtonElement {
    return createElement<HTMLButtonElement>({
      tag: "button",
      classNames: ["button", "button-race"],
      textContent: "RACE",
    });
  }

  private createResetRaceButton(): HTMLButtonElement {
    return createElement<HTMLButtonElement>({
      tag: "button",
      classNames: ["button", "button-reset"],
      textContent: "RESET",
    });
  }

  private createGenerateCarsButton(): HTMLButtonElement {
    return createElement<HTMLButtonElement>({
      tag: "button",
      classNames: ["button", "button-generate"],
      textContent: "GENERATE CARS",
    });
  }

  public render(): HTMLDivElement {
    return this.wrapper;
  }

  public getStartButton(): HTMLButtonElement {
    return this.startButton;
  }

  public getResetButton(): HTMLButtonElement {
    return this.resetButton;
  }

  public getGenerateCarsButton(): HTMLButtonElement {
    return this.generateCarsButton;
  }
}
