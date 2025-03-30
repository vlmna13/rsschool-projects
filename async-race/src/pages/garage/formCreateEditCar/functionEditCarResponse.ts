import { Car } from "../../../utils/types";

export async function editCarResponse(
  id: number,
  name: string,
  color: string,
): Promise<Car> {
  const url = `http://127.0.0.1:3000/garage/${id}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, color }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update car: ${response.statusText}`);
  }

  const data: Car = await response.json();
  return data;
}
