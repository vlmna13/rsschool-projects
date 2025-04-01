import { createElement } from "../../../utils/createElement";
import "./puginationElement.css";

export class PaginationElement {
  private headersWrapper: HTMLDivElement;
  private carCountElement: HTMLParagraphElement;
  private pageNumberElement: HTMLSpanElement;
  private paginationWrapper: HTMLDivElement;
  private prevButton: HTMLButtonElement;
  private nextButton: HTMLButtonElement;

  constructor(
    private currentPage: number,
    private totalPages: number,
    private onPageChange: (newPage: number) => Promise<void>,
  ) {
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
    this.addEventListeners();
    this.updatePaginationButtons(this.currentPage, this.totalPages);
  }
  private addEventListeners(): void {
    this.prevButton.addEventListener("click", async () => {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
        await this.onPageChange(this.currentPage);
      }
    });

    this.nextButton.addEventListener("click", async () => {
      console.log("1");
      if (this.currentPage < this.totalPages) {
        this.currentPage += 1;
        await this.onPageChange(this.currentPage);
      }
    });
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
  public updateTotalPages(totalPages: number): void {
    this.totalPages = totalPages;
    this.updatePaginationButtons(this.currentPage, this.totalPages);
  }
  public renderHeaders(): HTMLDivElement {
    return this.headersWrapper;
  }
  public renderPagination(): HTMLDivElement {
    return this.paginationWrapper;
  }
}
