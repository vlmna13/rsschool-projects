import { carData } from "../../../data/carsData";
import { createElement } from "../../../utils/createElement";
import { createCarResponse } from "../formCreateEditCar/functionCreateCarResponse";
import { shuffleCars } from "../functionShuffleCars";
import "./raceControlButtons.css";

export class RaceControlButtons {
  private wrapper: HTMLDivElement;
  private startButton: HTMLButtonElement;
  private resetButton: HTMLButtonElement;
  private generateCarsButton: HTMLButtonElement;

  constructor(private onGenerateCars: () => Promise<void>) {
    this.wrapper = createElement<HTMLDivElement>({
      tag: "div",
      classNames: ["wrapper-race-controls"],
    });
    this.startButton = this.createStartRaceButton();
    this.resetButton = this.createResetRaceButton();
    this.generateCarsButton = this.createGenerateCarsButton();
    this.generateCarsButton.addEventListener("click", async () => {
      await this.generateCars();
    });
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
  private async generateCars(): Promise<void> {
    const shuffledCars = shuffleCars(carData);
    const getRandomColor = (): string =>
      `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`;
    for (const carName of shuffledCars) {
      await createCarResponse(carName, getRandomColor());
    }
    await this.onGenerateCars();
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
