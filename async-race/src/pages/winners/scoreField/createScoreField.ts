import { createElement } from "../../../utils/createElement";
import { Winners } from "../../../utils/types";
import { ScoreFieldTitles } from "./createScoreFieldTitles";
import { renderWinners } from "./functionRenderWinners";

export class ScoreField {
  private fieldWrapper: HTMLDivElement;
  private scoreFieldTitles: ScoreFieldTitles;

  constructor(
    dataWinners: Winners,
    private getCurrentPage: () => number,
  ) {
    this.fieldWrapper = createElement<HTMLDivElement>({
      tag: "div",
      classNames: ["score-field"],
    });
    this.scoreFieldTitles = new ScoreFieldTitles(
      this.fieldWrapper,
      this.getCurrentPage,
      10,
    );
    this.fieldWrapper.append(this.scoreFieldTitles.render());
    this.renderMembers(dataWinners);
  }

  public render(): HTMLDivElement {
    return this.fieldWrapper;
  }

  public async renderMembers(dataWinners: Winners): Promise<void> {
    await renderWinners(this.fieldWrapper, dataWinners);
  }
}
