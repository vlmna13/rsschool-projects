import { createElement } from "../../../utils/createElement";
import { getStartStopResponse } from "./functionGetStartStopResponse";
import "./raceField.css";

export class StartStopButtons {
  private startButton: HTMLButtonElement;
  private stopButton: HTMLButtonElement;

  constructor(id: number, carImg: HTMLDivElement) {
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
    this.setupStartButton(id, this.stopButton);
    this.setupStopButton(id, this.startButton);
  }

  private setupStartButton(id: number, stopButton: HTMLButtonElement): void {
    this.startButton.addEventListener("click", async () => {
      try {
        this.startButton.setAttribute("disabled", "true");
        stopButton.removeAttribute("disabled");
        const data = await getStartStopResponse(id, "started");
        console.log("Car started:", data);
      } catch (error) {
        console.error("Error starting car:", error);
        this.startButton.removeAttribute("disabled");
        stopButton.setAttribute("disabled", "true");
      }
    });
  }

  private setupStopButton(id: number, startButton: HTMLButtonElement): void {
    this.stopButton.setAttribute("disabled", "true");
    this.stopButton.addEventListener("click", async () => {
      try {
        this.stopButton.setAttribute("disabled", "true");
        startButton.removeAttribute("disabled");
        const data = await getStartStopResponse(id, "stopped");
        console.log("Car stopped:", data);
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
