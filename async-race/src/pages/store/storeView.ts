import { Winners } from "../../utils/types";
import { PaginationElement } from "../components/paginationElement/paginationElement";
import { getWinnersResponse } from "./getWinnersResponse";
import { ScoreField } from "./scoreField/createScoreField";

export class StoreView {
  private scoreField: ScoreField;
  private pagination: PaginationElement;
  private data: Winners = [];
  private currentPage: number = 1;
  private totalCount: number = 0;
  private limit: number = 10;
}
