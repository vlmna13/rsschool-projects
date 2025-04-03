import { GarageResponse } from "../../utils/types";

export async function getGarageData(page: number, limit: number = 7) {
  const url = `http://127.0.0.1:3000/garage?_page=${page}&_limit=${limit}`;

  try {
    const response = await fetch(url);
    const data: GarageResponse = await response.json();
    // Получаем общее количество записей из заголовка X-Total-Count
    const totalCount = response.headers.get("X-Total-Count");
    return { data, totalCount: totalCount ? Number(totalCount) : 0 };
  } catch (error) {
    // console.error(error);
    return { data: <GarageResponse>[], totalCount: 0 };
  }
}
