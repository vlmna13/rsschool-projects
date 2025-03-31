import { createElement } from "../../../utils/createElement";
import { Car } from "../../../utils/types";
import "./raceField.css";

export class SelectDeleteButtons {
  private selectDeleteWrapper: HTMLDivElement;
  private buttonSelect: HTMLButtonElement;
  private buttonDelete: HTMLButtonElement;
  private carModel: HTMLParagraphElement;

  constructor(private data: Car) {
    this.selectDeleteWrapper = createElement<HTMLDivElement>({
      tag: "div",
      classNames: ["select-delete-wrapper"],
    });
    this.buttonSelect = createElement<HTMLButtonElement>({
      tag: "button",
      classNames: ["button", "button-select"],
      textContent: "SELECT",
    });

    this.buttonDelete = createElement<HTMLButtonElement>({
      tag: "button",
      classNames: ["button", "button-delete"],
      textContent: "DELETE",
    });

    this.carModel = createElement<HTMLParagraphElement>({
      tag: "p",
      classNames: ["car-model"],
      textContent: this.data.name,
    });
    this.selectDeleteWrapper.append(
      this.buttonSelect,
      this.buttonDelete,
      this.carModel,
    );
  }

  public getWrapper(): HTMLDivElement {
    return this.selectDeleteWrapper;
  }

  public getSelectButton(): HTMLButtonElement {
    return this.buttonSelect;
  }

  public getDeleteButton(): HTMLButtonElement {
    return this.buttonDelete;
  }

  public getCarModel(): HTMLParagraphElement {
    return this.carModel;
  }
}
