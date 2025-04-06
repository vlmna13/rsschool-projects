import { Car } from "../../utils/types";
import { FormEditCar } from "./formCreateEditCar/formEditCar";
import { Track } from "./raceField/createTrack";
import { deleteCar } from "./functionDeleteCar";
import { deleteWinner } from "./functionDeleteWinner";
export async function checkTrackButtons(
  event: Event,
  car: Car,
  formEditCar: FormEditCar,
  track: Track,
) {
  const target = event.target;
  if (target instanceof HTMLElement) {
    if (target.classList.contains("button-select")) {
      formEditCar.fillForm(car, track);
    } else if (target.classList.contains("button-delete")) {
      const isDeleted = await deleteCar(car.id);
      if (isDeleted) {
        // пользовательское событие "carDeleted"
        await deleteWinner(car.id);
        const carDeletedEvent = new CustomEvent("carDeleted");
        document.dispatchEvent(carDeletedEvent);
      }
    }
  }
}
