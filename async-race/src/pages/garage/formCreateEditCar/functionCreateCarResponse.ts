import { Car } from "../../../utils/types";

export async function createCarResponse(name: string, color: string) {
  const url = "http://127.0.0.1:3000/garage";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, color }),
    });
    if (!response.ok) {
      throw new Error(`Failed to create car: ${response.statusText}`);
    }
    const data: Car = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating car:", error);
    throw error;
  }
}
