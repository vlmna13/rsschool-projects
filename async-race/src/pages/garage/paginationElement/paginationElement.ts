import { createElement } from "../../../utils/createElement";
import "./puginationElement.css";

export class PaginationElement {
  private headersWrapper: HTMLDivElement;
  private carCountElement: HTMLParagraphElement;
  private pageNumberElement: HTMLSpanElement;
  private paginationWrapper: HTMLDivElement;
  private prevButton: HTMLButtonElement;
  private nextButton: HTMLButtonElement;

  constructor() {
    this.headersWrapper = createElement<HTMLDivElement>({
      tag: "div",
      classNames: ["headers-pagination"],
    });

    this.carCountElement = createElement<HTMLParagraphElement>({
      tag: "p",
      classNames: ["car-count"],
    });

    this.pageNumberElement = createElement<HTMLSpanElement>({
      tag: "span",
      classNames: ["page-number"],
    });

    this.headersWrapper.append(this.carCountElement, this.pageNumberElement);
    this.paginationWrapper = createElement<HTMLDivElement>({
      tag: "div",
      classNames: ["pagination"],
    });

    this.prevButton = createElement<HTMLButtonElement>({
      tag: "button",
      classNames: ["button", "prev-button"],
      textContent: "PREV",
    });

    this.nextButton = createElement<HTMLButtonElement>({
      tag: "button",
      classNames: ["button", "next-button"],
      textContent: "NEXT",
    });
    this.paginationWrapper.append(this.prevButton, this.nextButton);
  }

  public updateCarCount(totalCars: number): void {
    this.carCountElement.textContent = `GARAGE: ${totalCars}`;
  }
  public updatePageNumber(currentPage: number): void {
    this.pageNumberElement.textContent = `Page #${currentPage}`;
  }
  public updatePaginationButtons(
    currentPage: number,
    totalPages: number,
  ): void {
    this.prevButton.disabled = currentPage <= 1;
    this.nextButton.disabled = currentPage >= totalPages;
  }
  public getPrevButton(): HTMLButtonElement {
    return this.prevButton;
  }
  public getNextButton(): HTMLButtonElement {
    return this.nextButton;
  }
  public renderHeaders(): HTMLDivElement {
    return this.headersWrapper;
  }
  public renderPagination(): HTMLDivElement {
    return this.paginationWrapper;
  }
}
