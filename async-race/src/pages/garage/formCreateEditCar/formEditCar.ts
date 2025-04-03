import { createElement } from "../../../utils/createElement";
import { Track } from "../raceField/createTrack";
import "./formCreateEditCar.css";
import { editCarResponse } from "./functionEditCarResponse";

export class FormEditCar {
  private formWrapper: HTMLDivElement;
  private inputText: HTMLInputElement;
  private inputColor: HTMLInputElement;
  private buttonEdit: HTMLButtonElement;
  private currentTrack: Track | undefined = undefined;
  constructor() {
    this.formWrapper = createElement<HTMLDivElement>({
      tag: "div",
      classNames: ["form-edit-car"],
    });

    this.inputText = createElement<HTMLInputElement>({
      tag: "input",
      classNames: ["input-text", "disabled"],
    });
    this.inputText.disabled = true;
    this.inputText.type = "text";

    this.inputColor = createElement<HTMLInputElement>({
      tag: "input",
      classNames: ["input-color", "disabled"],
    });
    this.inputColor.type = "color";
    this.inputColor.disabled = true;

    this.buttonEdit = createElement<HTMLButtonElement>({
      tag: "button",
      classNames: ["button", "button-edit", "disabled"],
      textContent: "UPDATE",
    });
    this.buttonEdit.disabled = true;
    this.buttonEdit.addEventListener("click", () => this.updateCar());
    this.formWrapper.append(this.inputText, this.inputColor, this.buttonEdit);
  }

  public async updateCar() {
    if (!this.currentTrack) {
      return;
    }
    const carId = this.currentTrack.getCarId();
    const data = await editCarResponse(
      carId,
      this.inputText.value,
      this.inputColor.value,
    );
    this.currentTrack.getCarModel().textContent = data.name;
    this.currentTrack.getCarImg().style.backgroundColor = this.inputColor.value;
    this.inputText.disabled = true;
    this.inputText.value = "";
    this.inputText.classList.add("disabled");

    this.inputColor.disabled = true;
    this.inputColor.classList.add("disabled");

    this.buttonEdit.disabled = true;
    this.buttonEdit.classList.add("disabled");
  }

  public fillForm(car: { name: string; color: string }, track: Track): void {
    this.inputText.value = car.name;
    this.inputText.classList.remove("disabled");
    this.inputText.disabled = false;

    this.inputColor.value = car.color;
    this.inputColor.classList.remove("disabled");
    this.inputColor.disabled = false;

    this.buttonEdit.disabled = false;
    this.buttonEdit.classList.remove("disabled");
    this.currentTrack = track;
  }

  public render(): HTMLDivElement {
    return this.formWrapper;
  }
}
