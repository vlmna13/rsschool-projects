import { createElement } from "../../../utils/createElement";
import { addCarFromSprite } from "../../components/functionAddCarImage";
import "./scoreField.css";

export class CreateMember {
  private memberWrapper: HTMLDivElement;
  private memberId: HTMLParagraphElement;
  private memberImg: HTMLDivElement;
  private memberName: HTMLParagraphElement;
  private memberWins: HTMLParagraphElement;
  private memberTime: HTMLParagraphElement;
  constructor(
    private index: number,
    private color: string,
    private name: string,
    private wins: number,
    private time: number,
  ) {
    this.memberWrapper = createElement<HTMLDivElement>({
      tag: "div",
      classNames: ["member-wrapper"],
    });
    let indextoString = this.index.toString();
    this.memberId = createElement<HTMLParagraphElement>({
      tag: "p",
      classNames: ["member-id"],
      textContent: indextoString,
    });
    this.memberImg = addCarFromSprite(this.color, ["member-img"]);

    this.memberName = createElement<HTMLParagraphElement>({
      tag: "p",
      classNames: ["member-name"],
      textContent: this.name,
    });
    this.memberWins = createElement<HTMLParagraphElement>({
      tag: "span",
      classNames: ["member-wins"],
      textContent: this.wins.toString(),
    });
    this.memberTime = createElement<HTMLParagraphElement>({
      tag: "span",
      classNames: ["member-time"],
      textContent: this.time.toString(),
    });
  }

  public render(): HTMLDivElement {
    this.memberWrapper.append(
      this.memberId,
      this.memberImg,
      this.memberName,
      this.memberWins,
      this.memberTime,
    );
    return this.memberWrapper;
  }
}
