import { createElement } from "../../../utils/createElement";
import "./raceField.css";
import { setupStartButton } from "./setupStartButton";
import { setupStopButton } from "./setupStopButton";

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
    this.stopButton.setAttribute("disabled", "true");
    this.startButton.addEventListener(
      "click",
      setupStartButton(
        id,
        this.startButton,
        this.stopButton,
        carImg,
        carImageWrapper,
        async (id) => {
          this.animationFrameId = id;
        },
      ),
    );
    this.stopButton.addEventListener(
      "click",
      setupStopButton(
        id,
        this.startButton,
        this.stopButton,
        carImg,
        () => this.animationFrameId,
        (id) => (this.animationFrameId = id),
      ),
    );
  }

  public getStartButton(): HTMLButtonElement {
    return this.startButton;
  }

  public getStopButton(): HTMLButtonElement {
    return this.stopButton;
  }
}
