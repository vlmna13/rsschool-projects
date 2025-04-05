import { createElement } from "../../../utils/createElement";
import "./scoreField.css";

export class CreateMember {
  private memberWrapper: HTMLDivElement;
  private memberId: HTMLParagraphElement;
  private memberImg: HTMLDivElement;
  private memberName: HTMLParagraphElement;
  private memberWins: HTMLParagraphElement;
  private memberTime: HTMLParagraphElement;
  constructor(
    private id: number,
    private img: string,
    private name: string,
    private wins: number,
    private time: number,
  ) {
    this.memberWrapper = createElement<HTMLDivElement>({
      tag: "div",
      classNames: ["member-wrapper"],
    });
    this.memberId = createElement<HTMLParagraphElement>({
      tag: "p",
      classNames: ["member-id"],
      textContent: `ID: ${this.id}`,
    });
    this.memberImg = createElement<HTMLDivElement>({
      tag: "div",
      classNames: ["member-img"],
    });
    this.memberImg.style.backgroundColor = this.img;
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
