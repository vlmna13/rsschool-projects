import { createElement } from "../../../utils/createElement";
import { Car } from "../../../utils/types";
import { SelectDeleteButtons } from "./createSelectDeleteButtons";
import { StartStopButtons } from "./createStartStopButtons";
import { addCarFromSprite } from "../../components/functionAddCarImage";
import "./raceField.css";

export class Track {
  private track: HTMLDivElement;
  private selectDeleteButtons: SelectDeleteButtons;
  private trackLine: HTMLDivElement;
  private startStopButtons: StartStopButtons;
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

    this.carImageWrapper = createElement<HTMLDivElement>({
      tag: "div",
      classNames: ["car-image-wrapper"],
    });

    this.carImg = addCarFromSprite(this.data.color, ["car-image"]);
    this.startStopButtons = new StartStopButtons(
      this.data.id,
      this.carImageWrapper,
      this.carImg,
    );

    this.buildTrack();
  }

  private buildTrack(): void {
    this.carImageWrapper.append(this.carImg);
    this.trackLine.append(
      this.startStopButtons.getStartButton(),
      this.startStopButtons.getStopButton(),
      this.carImageWrapper,
    );
    this.track.append(this.selectDeleteButtons.getWrapper(), this.trackLine);
    this.track.setAttribute("data-id", this.data.id.toString());
  }
  public getTrackData(): [number, HTMLDivElement, HTMLDivElement] {
    return [this.data.id, this.carImageWrapper, this.carImg];
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
  public getStartStopButtons(): StartStopButtons {
    return this.startStopButtons;
  }
}
