import { createElement } from "../../../utils/createElement";
import { SortField } from "../getWinnersResponse";
import { SortButton } from "./createButtonSort";
import "./scoreField.css";

export class ScoreFieldTitles {
  private scoreFieldWrapper: HTMLDivElement;
  private scoreFieldId: HTMLSpanElement;
  private scoreFieldImg: HTMLSpanElement;
  private scoreFieldName: HTMLSpanElement;
  public scoreFieldWins: SortButton;
  public scoreFieldTime: SortButton;
  constructor(
    private fieldWrapper: HTMLDivElement,
    private getCurrentPage: () => number, // Передаём функцию для получения текущей страницы
    private limit: number = 1,
  ) {
    this.scoreFieldWrapper = createElement<HTMLDivElement>({
      tag: "div",
      classNames: ["score-titles"],
    });
    this.scoreFieldId = createElement<HTMLSpanElement>({
      tag: "span",
      classNames: ["score-titles-id"],
      textContent: "Number",
    });
    this.scoreFieldImg = createElement<HTMLSpanElement>({
      tag: "span",
      classNames: ["score-titles-img"],
      textContent: "Car",
    });
    this.scoreFieldName = createElement<HTMLSpanElement>({
      tag: "span",
      classNames: ["score-titles-name"],
      textContent: "Name",
    });
    this.scoreFieldWins = new SortButton(
      this.fieldWrapper,
      SortField.WINS,
      this.getCurrentPage,
      this.limit,
    );

    this.scoreFieldTime = new SortButton(
      this.fieldWrapper,
      SortField.TIME,
      this.getCurrentPage,
      this.limit,
      this.scoreFieldWins,
    );
    this.scoreFieldWins.otherButton = this.scoreFieldTime;
  }
  public render(): HTMLDivElement {
    this.scoreFieldWrapper.append(
      this.scoreFieldId,
      this.scoreFieldImg,
      this.scoreFieldName,
      this.scoreFieldWins.render(),
      this.scoreFieldTime.render(),
    );
    return this.scoreFieldWrapper;
  }
}
