import { createElement } from "../../../utils/createElement";
import { Winners } from "../../../utils/types";
import { getCar } from "../../garage/functionGetCar";
import { CreateMember } from "./createMember";
import { ScoreFieldTitles } from "./createScoreFieldTitles";

export class ScoreField {
  private fieldWrapper: HTMLDivElement;
  private scoreFieldTitles: ScoreFieldTitles;
  // private createMember: CreateMember;
  constructor(dataWinners: Winners, totalCount: number) {
    this.fieldWrapper = createElement<HTMLDivElement>({
      tag: "div",
      classNames: ["score-field"],
    });
    this.scoreFieldTitles = new ScoreFieldTitles();
    this.fieldWrapper.append(this.scoreFieldTitles.render());
    this.renderMembers(dataWinners, totalCount);
  }

  public render(): HTMLDivElement {
    return this.fieldWrapper;
  }

  public async renderMembers(
    dataWinners: Winners,
    totalCount: number,
  ): Promise<void> {
    this.clearMembers();
    const carIds = dataWinners.map((winner) => winner.id);
    const carPromises = carIds.map((id) => getCar(id));
    const cars = await Promise.all(carPromises);
    dataWinners.forEach((winner) => {
      const car = cars.find((c) => c.id === winner.id);
      if (car) {
        const member = new CreateMember(
          winner.id,
          car.color,
          car.name,
          winner.wins,
          winner.time,
        );
        this.fieldWrapper.append(member.render());
      }
    });
  }

  private clearMembers(): void {
    while (this.fieldWrapper.children.length > 1) {
      this.fieldWrapper.lastChild?.remove();
    }
  }
}
