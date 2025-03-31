import { Car } from "../../utils/types";
import { FormEditCar } from "./formCreateEditCar/formEditCar";
// import { fillEditForm } from "./formCreateEditCar/functionFillEditForm";

export function checkTrackButtons(
  event: Event,
  car: Car,
  formEditCar: FormEditCar,
) {
  const target = event.target;
  if (target instanceof HTMLElement) {
    if (target.classList.contains("button-start")) {
      console.log("Start button clicked for car ID:", car.id);
    } else if (target.classList.contains("button-stop")) {
      console.log("Stop button clicked for car ID:", car.id);
    } else if (target.classList.contains("button-select")) {
      // fillEditForm(formEditCar, car);
      formEditCar.fillForm(car);
    }
  }
}
