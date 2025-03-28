import { createElement } from "../../../utils/createElement";
import { Car } from "../../../utils/types";
import { createSelectDeleteWrapper } from "./createSelectDeleteButtons";
import { createButtonStart, createButtonStop } from "./createStartStopButtons";
import "./raceField.css";

export function createTrack(data: Car) {
  const track = createElement<HTMLElement>({
    tag: "div",
    classNames: ["track"],
  });

  const selectDelete = createSelectDeleteWrapper(data);
  const trackLine = createElement<HTMLElement>({
    tag: "div",
    classNames: ["track-line"],
  });
  track.setAttribute("data-id", data.id.toString());

  const startButton = createButtonStart();
  const stopButton = createButtonStop();

  const carImage = createElement<HTMLImageElement>({
    tag: "img",
    classNames: ["car-image"],
  });
  carImage.setAttribute("fill", data.color);
  carImage.src = "./img/car.svg";
  carImage.alt = "Car";
  trackLine.append(startButton, stopButton, carImage);
  track.append(selectDelete, trackLine);
  return track;
}
