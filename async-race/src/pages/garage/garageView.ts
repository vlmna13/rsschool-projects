import { createElement } from "../../utils/createElement";
import { FormCreateCar } from "./formCreateEditCar/formCreateCar";
import { getGarageData } from "./getGarageData";
import { RaceControlButtons } from "./raceControlbuttons/raceControlButtons";
import { Track } from "./raceField/createTrack";
import "../../styles/common.css";
import { checkTrackButtons } from "./functionCheckTrackButtons";
import { FormEditCar } from "./formCreateEditCar/formEditCar";
import { PaginationElement } from "./paginationElement/paginationElement";

export class GarageView {
  private page: number;
  private limit: number;
  private garageContainer: HTMLDivElement;
  private formCreateCar: FormCreateCar;
  private formEditCar: FormEditCar;
  private raceControl: RaceControlButtons;
  private paginationElement: PaginationElement;
  constructor(private childView: HTMLDivElement) {
    this.page = 1;
    this.limit = 7;
    this.garageContainer = createElement<HTMLDivElement>({
      tag: "div",
      classNames: ["garage-container"],
    });
    this.formCreateCar = new FormCreateCar(this.garageContainer);
    this.formEditCar = new FormEditCar(this.garageContainer);
    this.raceControl = new RaceControlButtons();
    this.paginationElement = new PaginationElement();
    // Добавляем обработчик события "carDeleted"
    document.addEventListener("carDeleted", async () => {
      await this.renderCars();
    });
    // Обработчик события "carCreated"
    document.addEventListener("carCreated", async () => {
      await this.renderCars();
    });
  }

  private async renderCars(): Promise<void> {
    this.garageContainer.innerHTML = "";
    const garageData = await getGarageData(this.page, this.limit);
    if (garageData.data.length > 0) {
      garageData.data.forEach((car) => {
        const track = new Track(car);
        const carEl = track.render();
        carEl.addEventListener("click", (event: Event) => {
          checkTrackButtons(event, car, this.formEditCar, track);
        });
        this.garageContainer.append(carEl);
      });
    } else {
      this.garageContainer.textContent = "No cars found.";
    }
    const totalCars = garageData.totalCount;
    const totalPages = Math.ceil(totalCars / this.limit);
    this.paginationElement.updateCarCount(totalCars);
    this.paginationElement.updatePageNumber(this.page);
    this.paginationElement.updatePaginationButtons(this.page, totalPages);
  }

  public async render(): Promise<void> {
    this.childView.innerHTML = "";
    this.childView.append(
      this.formCreateCar.render(),
      this.formEditCar.render(),
      this.raceControl.render(),
      this.paginationElement.renderHeaders(),
      this.garageContainer,
      this.paginationElement.renderPagination(),
    );
    await this.renderCars();
  }

  // public async paginate(page: number): Promise<void> {
  //   this.page = page;
  //   await this.renderCars();
  // }
}
