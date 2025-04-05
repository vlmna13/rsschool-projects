import { Winners } from "../../utils/types";
import { getWinnersResponse, SortField, SortOrder } from "./getWinnersResponse";
import { ScoreField } from "./scoreField/createScoreField";

export class WinnersView {
  private scoreField: ScoreField;
  private data: Winners = [];
  private totalCount: number = 0;
  constructor(private childView: HTMLDivElement) {
    this.scoreField = new ScoreField(this.data, this.totalCount);
  }

  private async fetchWinnersData(page: number, limit: number) {
    try {
      const { data, totalCount } = await getWinnersResponse(page, limit);
      this.data = data;
      this.totalCount = totalCount;
      return { data, totalCount };
    } catch (error) {
      this.data = [];
      this.totalCount = 0;
      return { data: [], totalCount: 0 };
    }
  }

  async render(): Promise<void> {
    this.childView.innerHTML = "";
    await this.fetchWinnersData(1, 10);
    console.log(this.data);
    this.scoreField = new ScoreField(this.data, this.totalCount);
    this.childView.appendChild(this.scoreField.render());
  }
}
