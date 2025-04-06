import { createElement } from "../../../utils/createElement";
import {
  getWinnersResponse,
  SortField,
  SortOrder,
} from "../../winners/getWinnersResponse";
import { renderWinners } from "./functionRenderWinners";

export class SortButton {
  private button: HTMLButtonElement;
  private isDescending: boolean;

  constructor(
    private fieldWrapper: HTMLDivElement,
    private sortField: SortField,
    private getCurrentPage: () => number, // Функция для получения текущей страницы
    private limit: number = 10,
    public otherButton?: SortButton, // Ссылка на другую кнопку
  ) {
    this.isDescending = true;
    this.button = createElement<HTMLButtonElement>({
      tag: "button",
      classNames: [`sort-button-${sortField.toLowerCase()}`],
      textContent: sortField === SortField.WINS ? "Wins" : "Time",
    });
    this.button.addEventListener("click", async () => {
      await this.handleClick();
    });
  }

  private async handleClick(): Promise<void> {
    try {
      const order = this.isDescending ? SortOrder.DESC : SortOrder.ASC;
      const currentPage = this.getCurrentPage();
      const { data } = await getWinnersResponse(
        currentPage,
        this.limit,
        this.sortField,
        order,
      );
      await renderWinners(this.fieldWrapper, data, currentPage, this.limit);
      this.button.textContent = this.isDescending
        ? `${this.sortField === SortField.WINS ? "Wins ↓" : "Time ↓"}`
        : `${this.sortField === SortField.WINS ? "Wins ↑" : "Time ↑"}`;
      if (this.otherButton) {
        this.otherButton.reset();
      }
      this.isDescending = !this.isDescending;
    } catch (error) {
      console.error("Ошибка при сортировке:", error);
    }
  }

  public render(): HTMLButtonElement {
    return this.button;
  }
  public reset(): void {
    this.button.textContent =
      this.sortField === SortField.WINS ? "Wins" : "Time";
    this.isDescending = true; // Сбрасываем состояние сортировки
  }
}
