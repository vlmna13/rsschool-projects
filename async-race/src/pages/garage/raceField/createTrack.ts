import { createElement } from "../../../utils/createElement";
import { Car } from "../../../utils/types";
import { SelectDeleteButtons } from "./createSelectDeleteButtons";
import { createButtonStart, createButtonStop } from "./createStartStopButtons";
import "./raceField.css";

export class Track {
  private track: HTMLDivElement;
  private selectDeleteButtons: SelectDeleteButtons;
  private trackLine: HTMLDivElement;
  private startButton: HTMLButtonElement;
  private stopButton: HTMLButtonElement;
  private carImageWrapper: HTMLDivElement;
  private carImg: HTMLDivElement;
  constructor(private data: Car) {
    this.track = createElement<HTMLDivElement>({
      tag: "div",
      classNames: ["track"],
    });
    this.selectDeleteButtons = new SelectDeleteButtons(this.data);

    this.trackLine = createElement<HTMLDivElement>({
      tag: "div",
      classNames: ["track-line"],
    });

    this.startButton = createButtonStart();
    this.stopButton = createButtonStop();

    this.carImageWrapper = createElement<HTMLDivElement>({
      tag: "div",
      classNames: ["car-image-wrapper"],
    });

    this.carImg = createElement<HTMLDivElement>({
      tag: "div",
      classNames: ["car-image"],
    });
    this.carImg.style.backgroundColor = this.data.color;

    this.buildTrack();
  }

  private buildTrack(): void {
    this.carImageWrapper.append(this.carImg);
    this.trackLine.append(
      this.startButton,
      this.stopButton,
      this.carImageWrapper,
    );
    this.track.append(this.selectDeleteButtons.getWrapper(), this.trackLine);
    this.track.setAttribute("data-id", this.data.id.toString());
  }

  public getCarModel(): HTMLParagraphElement {
    return this.selectDeleteButtons.getCarModel();
  }

  public getCarId(): number {
    return this.data.id;
  }

  public getCarImg(): HTMLDivElement {
    return this.carImg;
  }

  public render(): HTMLDivElement {
    return this.track;
  }
}
