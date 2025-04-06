import { Winners } from "../../utils/types";
import { PaginationElement } from "../garage/paginationElement/paginationElement";
import { getWinnersResponse } from "./getWinnersResponse";
import { ScoreField } from "./scoreField/createScoreField";
import "../garage/paginationElement/puginationElement.css";

export class WinnersView {
  private scoreField: ScoreField;
  private pagination: PaginationElement;
  private data: Winners = [];
  private currentPage: number = 1;
  private totalCount: number = 0;
  private limit: number = 10;

  constructor(private childView: HTMLDivElement) {
    this.scoreField = new ScoreField(this.data, () => this.currentPage);
    this.pagination = new PaginationElement(
      this.currentPage,
      Math.ceil(this.totalCount / this.limit),
      async (newPage: number) => {
        this.currentPage = newPage;
        this.updatePage();
      },
      "Winners",
    );
  }

  private async fetchWinnersData(page: number, limit: number) {
    try {
      const { data, totalCount } = await getWinnersResponse(page, limit);
      this.data = data;
      this.totalCount = totalCount;
      this.pagination.updateTotalPages(Math.ceil(totalCount / this.limit));
      return { data, totalCount };
    } catch (error) {
      this.data = [];
      this.totalCount = 0;
    }
  }

  async render(): Promise<void> {
    this.childView.innerHTML = "";
    await this.fetchWinnersData(1, this.limit);
    this.scoreField = new ScoreField(this.data, () => this.currentPage);
    this.pagination.updateCarCount(this.totalCount);
    this.pagination.updatePageNumber(this.currentPage);

    this.childView.append(
      this.pagination.renderHeaders(),
      this.scoreField.render(),
      this.pagination.renderPagination(),
    );
  }

  private async updatePage(): Promise<void> {
    await this.fetchWinnersData(this.currentPage, this.limit);
    this.scoreField.renderMembers(this.data);
    this.pagination.updatePageNumber(this.currentPage);
  }
}
