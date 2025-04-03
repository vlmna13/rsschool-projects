import { carData } from "../../../data/carsData";
import { createElement } from "../../../utils/createElement";
import { createCarResponse } from "../formCreateEditCar/functionCreateCarResponse";
import { shuffleCars } from "../functionShuffleCars";
import { StartStopButtons } from "../raceField/createStartStopButtons";
import { setupStopButton } from "../raceField/setupStopButton";
import {
  createGenerateCarsButton,
  createResetRaceButton,
  createStartRaceButton,
} from "./createControllsButtons";
import { startRace } from "./functionstartRace";
import { stopRace } from "./functonStopRace";
export { createStartRaceButton } from "./createControllsButtons";
import "./raceControlButtons.css";

export class RaceControlButtons {
  private wrapper: HTMLDivElement;
  private startRaceButton: HTMLButtonElement;
  private resetButton: HTMLButtonElement;
  private generateCarsButton: HTMLButtonElement;
  private trackData: [number, HTMLDivElement, HTMLDivElement][] = [];
  private startStopButtons: StartStopButtons[] = [];
  private animationHandlers: { id: number; stop: () => void; carId: number }[] =
    [];

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
      await startRace(
        this.trackData,
        this.startStopButtons,
        this.animationHandlers,
      );
    });

    this.resetButton.addEventListener("click", async () => {
      await stopRace(
        this.trackData,
        this.startStopButtons,
        this.animationHandlers,
      );
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

  // private async stopRace(): Promise<void> {
  //   const promises = this.animationHandlers.map(async (handler) => {
  //     const trackItem = this.trackData.find(
  //       ([carId]) => carId === handler.carId,
  //     );
  //     if (!trackItem) {
  //       return; // Если данные не найдены, пропускаем
  //     }

  //     const [id, carImageWrapper, carImg] = trackItem;

  //     // Используем индекс для получения startStopButton
  //     const startStopButton = this.startStopButtons.find(
  //       (button, index) => this.trackData[index][0] === handler.carId,
  //     );
  //     if (!startStopButton) {
  //       return; // Если кнопки не найдены, пропускаем
  //     }
  //     const startButton = startStopButton.getStartButton();
  //     const stopButton = startStopButton.getStopButton();
  //     const stopHandler = setupStopButton(
  //       id,
  //       startButton,
  //       stopButton,
  //       carImg,
  //       () => {
  //         // Возвращаем handler с carId
  //         return {
  //           id: handler.id,
  //           stop: handler.stop,
  //           carId: handler.carId,
  //         };
  //       },
  //       (animation) => {
  //         // Удаляем анимацию из массива
  //         this.animationHandlers = this.animationHandlers.filter(
  //           (h) => h.id !== handler.id,
  //         );
  //         if (animation) {
  //           this.animationHandlers.push({
  //             ...animation,
  //             carId: id,
  //           });
  //         }
  //       },
  //     );
  //     await stopHandler();
  //   });
  //   await Promise.all(promises);
  // }

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
