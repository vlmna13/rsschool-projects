import { Car } from "../../utils/types";
import { FormEditCar } from "./formCreateEditCar/formEditCar";
import { Track } from "./raceField/createTrack";
import { deleteCar } from "./raceField/functionDeleteCar";
export async function checkTrackButtons(
  event: Event,
  car: Car,
  formEditCar: FormEditCar,
  track: Track,
) {
  const target = event.target;
  if (target instanceof HTMLElement) {
    if (target.classList.contains("button-start")) {
      console.log("Start button clicked for car ID:", car.id);
    } else if (target.classList.contains("button-stop")) {
      console.log("Stop button clicked for car ID:", car.id);
    } else if (target.classList.contains("button-select")) {
      // fillEditForm(formEditCar, car);
      formEditCar.fillForm(car, track);
    } else if (target.classList.contains("button-delete")) {
      const isDeleted = await deleteCar(car.id);
      if (isDeleted) {
        const carElement = track.render();
        carElement.remove();
      }
    }
  }
}
