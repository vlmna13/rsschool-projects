import { createElement } from "../../../utils/createElement";
import { animateCar } from "./functionAnimateCar";
import { getStartStopResponse } from "./functionGetStartStopResponse";
import { moveCarResponse } from "./functionMoveCarResponse";
import "./raceField.css";

export class StartStopButtons {
  private startButton: HTMLButtonElement;
  private stopButton: HTMLButtonElement;
  private animationFrameId: { id: number; stop: () => void } | null = null; // Добавлено свойство

  constructor(
    id: number,
    carImageWrapper: HTMLDivElement,
    carImg: HTMLDivElement,
  ) {
    this.startButton = createElement<HTMLButtonElement>({
      tag: "button",
      classNames: ["button", "button-start"],
      textContent: "A",
    });

    this.stopButton = createElement<HTMLButtonElement>({
      tag: "button",
      classNames: ["button", "button-stop"],
      textContent: "B",
    });
    this.setupStartButton(id, this.stopButton, carImg, carImageWrapper);
    this.setupStopButton(id, this.startButton, carImg);
  }

  private setupStartButton(
    id: number,
    stopButton: HTMLButtonElement,
    carImg: HTMLDivElement,
    carImageWrapper: HTMLDivElement,
  ): void {
    this.startButton.addEventListener("click", async () => {
      try {
        this.startButton.setAttribute("disabled", "true");
        stopButton.removeAttribute("disabled");
        const data = await getStartStopResponse(id, "started");
        const bracke = await moveCarResponse(id);
        console.log("Car started:", data);
        console.log(bracke);
        this.animationFrameId = animateCar(
          carImg,
          carImageWrapper,
          data,
          () => {
            this.startButton.removeAttribute("disabled");
            stopButton.setAttribute("disabled", "true");
            this.animationFrameId = null; // Сбрасываем ID анимации
          },
        );
      } catch (error) {
        console.error("Error starting car:", error);
        this.startButton.removeAttribute("disabled");
        stopButton.setAttribute("disabled", "true");
      }
    });
  }

  private setupStopButton(
    id: number,
    startButton: HTMLButtonElement,
    carImg: HTMLDivElement,
  ): void {
    this.stopButton.setAttribute("disabled", "true");
    this.stopButton.addEventListener("click", async () => {
      try {
        const data = await getStartStopResponse(id, "stopped");
        console.log("Car stopped:", data);
        if (this.animationFrameId !== null) {
          this.animationFrameId.stop(); // Вызываем метод остановки
          this.animationFrameId = null;
        }
        carImg.style.left = "0px";
        this.stopButton.setAttribute("disabled", "true");
        startButton.removeAttribute("disabled");
      } catch (error) {
        console.error("Error stopping car:", error);
        this.stopButton.removeAttribute("disabled");
        startButton.setAttribute("disabled", "true");
      }
    });
  }

  public getStartButton(): HTMLButtonElement {
    return this.startButton;
  }

  public getStopButton(): HTMLButtonElement {
    return this.stopButton;
  }
}
