import { carData } from "../../../data/carsData";
import { createElement } from "../../../utils/createElement";
import { createCarResponse } from "../formCreateEditCar/functionCreateCarResponse";
import { shuffleCars } from "../functionShuffleCars";
import { StartStopButtons } from "../raceField/createStartStopButtons";
import { setupStartButton } from "../raceField/setupStartButton";
import {
  createGenerateCarsButton,
  createResetRaceButton,
  createStartRaceButton,
} from "./createControllsButtons";
export { createStartRaceButton } from "./createControllsButtons";
import "./raceControlButtons.css";

export class RaceControlButtons {
  private wrapper: HTMLDivElement;
  private startRaceButton: HTMLButtonElement;
  private resetButton: HTMLButtonElement;
  private generateCarsButton: HTMLButtonElement;
  private trackData: [number, HTMLDivElement, HTMLDivElement][] = [];
  private startStopButtons: StartStopButtons[] = [];

  constructor(
    private onGenerateCars: () => Promise<void>,
    trackData: [number, HTMLDivElement, HTMLDivElement][],
    startStopButtons: StartStopButtons[],
  ) {
    this.trackData = trackData;
    this.startStopButtons = startStopButtons;
    this.wrapper = createElement<HTMLDivElement>({
      tag: "div",
      classNames: ["wrapper-race-controls"],
    });
    this.startRaceButton = createStartRaceButton();
    this.resetButton = createResetRaceButton();
    this.generateCarsButton = createGenerateCarsButton();
    this.generateCarsButton.addEventListener("click", async () => {
      await this.generateCars();
    });
    this.wrapper.append(
      this.startRaceButton,
      this.resetButton,
      this.generateCarsButton,
    );
    this.startRaceButton.addEventListener("click", async () => {
      await this.startRace();
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
  public updateTrackData(
    trackData: [number, HTMLDivElement, HTMLDivElement][],
  ): void {
    this.trackData = trackData;
  }

  private async startRace(): Promise<void> {
    const promises = this.trackData.map(
      async ([id, carImageWrapper, carImg], index) => {
        const startStopButton = this.startStopButtons[index];
        const startButton = startStopButton.getStartButton();
        const stopButton = startStopButton.getStopButton();
        const startHandler = setupStartButton(
          id,
          startButton,
          stopButton,
          carImg,
          carImageWrapper,
          async () => {},
        );
        await startHandler();
      },
    );
    await Promise.all(promises);
  }

  public render(): HTMLDivElement {
    return this.wrapper;
  }

  public getStartButton(): HTMLButtonElement {
    return this.startRaceButton;
  }

  public getResetButton(): HTMLButtonElement {
    return this.resetButton;
  }
}
