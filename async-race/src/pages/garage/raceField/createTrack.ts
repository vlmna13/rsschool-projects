import { createElement } from "../../../utils/createElement";
import { Car } from "../../../utils/types";
import { createSelectDeleteWrapper } from "./createSelectDeleteButtons";
import { createButtonStart, createButtonStop } from "./createStartStopButtons";
import "./raceField.css";

// export function createTrack(data: Car) {
//   const track = createElement<HTMLElement>({
//     tag: "div",
//     classNames: ["track"],
//   });

//   const selectDelete = createSelectDeleteWrapper(data);
//   const trackLine = createElement<HTMLElement>({
//     tag: "div",
//     classNames: ["track-line"],
//   });
//   track.setAttribute("data-id", data.id.toString());

//   const startButton = createButtonStart();
//   const stopButton = createButtonStop();

//   const carImage = createElement<HTMLImageElement>({
//     tag: "div",
//     classNames: ["car-image-wrapper"],
//   });

//   const car = createElement<HTMLDivElement>({
//     tag: "div",
//     classNames: ["car-image"],
//   });
//   car.style.backgroundColor = data.color;
//   carImage.append(car);
//   trackLine.append(startButton, stopButton, carImage);
//   track.append(selectDelete, trackLine);
//   return track;
// }

export class Track {
  private track: HTMLDivElement;
  private selectDelete: HTMLDivElement;
  private carModel: HTMLParagraphElement;
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
    const { selectDeleteWrapper, carModel } = createSelectDeleteWrapper(
      this.data,
    );
    this.selectDelete = selectDeleteWrapper;
    this.carModel = carModel;

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
    this.track.append(this.selectDelete, this.trackLine);
    this.track.setAttribute("data-id", this.data.id.toString());
  }

  public getCarModel(): HTMLParagraphElement {
    return this.carModel;
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
