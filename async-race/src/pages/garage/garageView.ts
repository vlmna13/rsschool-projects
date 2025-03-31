import { createElement } from "../../utils/createElement";
// import { createWrapperButtons } from "../components/buttonsRouting/buttonsRouting";
// import { createMainElement } from "../components/mainElement";
import { FormCreateCar } from "./formCreateEditCar/formCreateCar";
// import { createFormEditCar } from "./formCreateEditCar/formEditCar";
import { getGarageData } from "./getGarageData";
import { createRaceControlButtons } from "./raceControlbuttons/raceControlButtons";
import { createTrack } from "./raceField/createTrack";
import "../../styles/common.css";
import { checkTrackButtons } from "./functionCheckTrackButtons";
import { FormEditCar } from "./formCreateEditCar/formEditCar";

// export async function garageView(childView:HTMLDivElement) {
//   childView.innerHTML = "";

//   // const { mainElement } = createMainElement();
//   // document.body.append(mainElement);

//   const garageContainer = createElement<HTMLDivElement>({
//     tag: "div",
//     classNames: ["garage-container"],
//   });
//   // const wrapperButtons = createWrapperButtons();
//   const formCreateCar = createFormCreateCar(garageContainer);
//   const formEditCar = createFormEditCar();
//   const raceControl = createRaceControlButtons();

//   childView.append(
//     // wrapperButtons,
//     formCreateCar,
//     formEditCar,
//     raceControl,
//     garageContainer,
//   );
//   const page = 1;
//   const limit = 7;
//   const garageData = await getGarageData(page, limit);
//   if (garageData.data.length > 0) {
//     garageData.data.forEach((car) => {
//       const carEl = createTrack(car);
//       carEl.addEventListener("click", (event) => {
//         checkTrackButtons(event, car, formEditCar);
//       });
//       garageContainer.append(carEl);
//     });
//   } else {
//     garageContainer.textContent = "No cars found.";
//   }
// }

export class GarageView {
  private page: number;
  private limit: number;
  private garageContainer: HTMLDivElement;
  private formCreateCar: FormCreateCar;
  private formEditCar: FormEditCar;
  constructor(private childView: HTMLDivElement) {
    this.page = 1;
    this.limit = 7;
    this.garageContainer = <HTMLDivElement>{};
    this.formCreateCar = new FormCreateCar(this.garageContainer);
    this.formEditCar = new FormEditCar(this.garageContainer);
  }

  private async renderCars(): Promise<void> {
    this.garageContainer.innerHTML = "";
    const garageData = await getGarageData(this.page, this.limit);
    if (garageData.data.length > 0) {
      garageData.data.forEach((car) => {
        const carEl = createTrack(car);
        carEl.addEventListener("click", (event) => {
          checkTrackButtons(event, car, this.formEditCar);
        });
        this.garageContainer.append(carEl);
      });
    } else {
      this.garageContainer.textContent = "No cars found.";
    }
  }

  public async render(): Promise<void> {
    this.childView.innerHTML = "";
    const raceControl = createRaceControlButtons();
    this.formCreateCar.render();

    this.garageContainer = createElement<HTMLDivElement>({
      tag: "div",
      classNames: ["garage-container"],
    });
    this.childView.append(
      this.formCreateCar.render(),
      this.formEditCar.render(),
      raceControl,
      this.garageContainer,
    );

    await this.renderCars();
  }

  public async paginate(page: number): Promise<void> {
    this.page = page;
    await this.renderCars();
  }
}
