import { createElement } from "../../../utils/createElement";
import "./scoreField.css";

export class ScoreFieldTitles {
  private scoreFieldWrapper: HTMLDivElement;
  private scoreFieldId: HTMLSpanElement;
  private scoreFieldImg: HTMLSpanElement;
  private scoreFieldName: HTMLSpanElement;
  private scoreFieldWins: HTMLSpanElement;
  private scoreFieldTime: HTMLSpanElement;

  constructor() {
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
    this.scoreFieldWins = createElement<HTMLSpanElement>({
      tag: "span",
      classNames: ["score-titles-wins"],
      textContent: "Wins",
    });
    this.scoreFieldTime = createElement<HTMLSpanElement>({
      tag: "span",
      classNames: ["score-titles-time"],
      textContent: "Time",
    });
  }
  public render(): HTMLDivElement {
    this.scoreFieldWrapper.append(
      this.scoreFieldId,
      this.scoreFieldImg,
      this.scoreFieldName,
      this.scoreFieldWins,
      this.scoreFieldTime,
    );
    return this.scoreFieldWrapper;
  }
}
