import { createElement } from "../../utils/createElement";
import { FormCreateCar } from "./formCreateEditCar/formCreateCar";
import { getGarageData } from "./getGarageData";
import { RaceControlButtons } from "./raceControlbuttons/raceControlButtons";
import { Track } from "./raceField/createTrack";
import "../../styles/common.css";
import { checkTrackButtons } from "./functionCheckTrackButtons";
import { FormEditCar } from "./formCreateEditCar/formEditCar";
import { PaginationElement } from "./paginationElement/paginationElement";
import { GarageResponse } from "../../utils/types";
import { StartStopButtons } from "./raceField/createStartStopButtons";

export class GarageView {
  private page: number;
  private limit: number;
  private garageContainer: HTMLDivElement;
  private formCreateCar: FormCreateCar;
  private formEditCar: FormEditCar;
  private raceControl: RaceControlButtons;
  private paginationElement: PaginationElement;
  private trackData: [number, HTMLDivElement, HTMLDivElement][] = [];
  private startStopButtons: StartStopButtons[] = [];
  constructor(private childView: HTMLDivElement) {
    this.page = 1;
    this.limit = 7;
    this.garageContainer = createElement<HTMLDivElement>({
      tag: "div",
      classNames: ["garage-container"],
    });
    this.formCreateCar = new FormCreateCar();
    this.formEditCar = new FormEditCar();
    this.raceControl = new RaceControlButtons(
      async () => {
        await this.getGarageData();
      },
      this.trackData, // Передаём trackData
      this.startStopButtons, // Временно пустой массив startStopButtons
    );
    this.paginationElement = new PaginationElement(
      this.page,
      1,
      async (newPage: number) => {
        this.page = newPage;
        await this.getGarageData();
      },
    );
    document.addEventListener("carDeleted", async () => {
      await this.getGarageData();
    });
    document.addEventListener("carCreated", async () => {
      await this.getGarageData(), this.trackData;
    });
  }
  private async getGarageData(): Promise<void> {
    const garageData = await getGarageData(this.page, this.limit);
    const totalCars = garageData.totalCount;
    const allcars = garageData.data;
    const totalPages = Math.ceil(totalCars / this.limit);
    this.paginationElement.updateCarCount(totalCars);
    this.paginationElement.updatePageNumber(this.page);
    this.paginationElement.updateTotalPages(totalPages);
    await this.renderCars(allcars);
    this.raceControl.updateTrackData(this.trackData);
  }

  private async renderCars(allcars: GarageResponse): Promise<void> {
    this.garageContainer.innerHTML = "";
    this.trackData = [];
    if (allcars.length > 0) {
      allcars.forEach((car) => {
        const track = new Track(car);
        const carEl = track.render();
        this.trackData.push(track.getTrackData());
        this.startStopButtons.push(track.getStartStopButtons());
        carEl.addEventListener("click", (event: Event) => {
          checkTrackButtons(event, car, this.formEditCar, track);
        });
        this.garageContainer.append(carEl);
      });
    } else {
      this.garageContainer.textContent = "No cars found.";
    }
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
    await this.getGarageData();
  }
}
