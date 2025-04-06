import { Winners } from "../../utils/types";
export enum SortField {
  ID = "id",
  WINS = "wins",
  TIME = "time",
}

export enum SortOrder {
  ASC = "ASC",
  DESC = "DESC",
}

export async function getWinnersResponse(
  page: number = 1,
  limit: number = 10,
  sort?: SortField,
  order?: SortOrder,
): Promise<{ data: Winners; totalCount: number }> {
  const url = new URL("http://127.0.0.1:3000/winners");
  url.searchParams.append("_page", page.toString());
  url.searchParams.append("_limit", limit.toString());
  if (sort) {
    url.searchParams.append("_sort", sort);
  }
  if (order) {
    url.searchParams.append("_order", order);
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Ошибка при получении данных: ${response.statusText}`);
  }

  const data = await response.json();
  const totalCount = parseInt(response.headers.get("X-Total-Count") || "0", 10);
  return { data, totalCount };
}
