import { createElement } from "../../utils/createElement";
import { createWrapperButtons } from "../components/buttonsRouting/buttonsRouting";
import { createMainElement } from "../components/mainElement";
import { createFormCreateCar } from "./formCreateEditCar/formCreateCar";
import { createFormEditCar } from "./formCreateEditCar/formEditCar";
import { getGarageData } from "./getGarageData";
import { createRaceControlButtons } from "./raceControlbuttons/raceControlButtons";
import { createTrack } from "./raceField/createTrack";
import "../../styles/common.css";

export async function garageView() {
  const mainElement = createMainElement();
  document.body.append(mainElement);
  const wrapperButtons = createWrapperButtons();
  const formCreateCar = createFormCreateCar();
  const formEditCar = createFormEditCar();
  const raceControl = createRaceControlButtons();
  const garageContainer = createElement<HTMLDivElement>({
    tag: "div",
    classNames: ["garage-container"],
  });
  mainElement.append(
    wrapperButtons,
    formCreateCar,
    formEditCar,
    raceControl,
    garageContainer,
  );
  const page = 1;
  const limit = 7;
  const garageData = await getGarageData(page, limit);
  if (garageData.data.length > 0) {
    garageData.data.forEach((car) => {
      const carEl = createTrack(car);
      garageContainer.append(carEl);
    });
  } else {
    garageContainer.textContent = "No cars found.";
  }
}
