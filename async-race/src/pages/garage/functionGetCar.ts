import { Car } from "../../utils/types";

export async function getCar(id: number): Promise<Car> {
  const url = `http://127.0.0.1:3000/garage/${id}`;
  const response = await fetch(url, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch car with ID ${id}: ${response.statusText}`,
    );
  }
  const data: Car = await response.json();
  return data;
}
