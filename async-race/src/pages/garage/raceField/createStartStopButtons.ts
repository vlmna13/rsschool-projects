import { createElement } from "../../../utils/createElement";
import { animateCar } from "./functionAnimateCar";
import { getStartStopResponse } from "./functionGetStartStopResponse";
import { moveCarResponse, MoveErrorCode } from "./functionMoveCarResponse";
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
        if (!("velocity" in data && "distance" in data)) {
          this.startButton.removeAttribute("disabled");
          stopButton.setAttribute("disabled", "true");
          return;
        }
        this.animationFrameId = animateCar(
          carImg,
          carImageWrapper,
          data,
          () => {
            if (this.animationFrameId !== null) {
              this.startButton.removeAttribute("disabled");
              stopButton.setAttribute("disabled", "true");
              this.animationFrameId = null;
            }
          },
        );
        const moveData = await moveCarResponse(id);
        if ("code" in moveData) {
          if (moveData.code === MoveErrorCode.ENGINE_BROKEN) {
            if (this.animationFrameId !== null) {
              this.animationFrameId.stop();
              this.animationFrameId = null;
            }
            this.startButton.removeAttribute("disabled");
            stopButton.setAttribute("disabled", "true");
          }
          return;
        }
      } catch (error) {
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
        if (!("velocity" in data && "distance" in data)) {
          this.stopButton.removeAttribute("disabled");
          startButton.setAttribute("disabled", "true");
          return;
        }
        if (this.animationFrameId !== null) {
          this.animationFrameId.stop(); // Вызываем метод остановки
          this.animationFrameId = null;
        }
        carImg.style.left = "0px";
        this.stopButton.setAttribute("disabled", "true");
        startButton.removeAttribute("disabled");
      } catch (error) {
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
