import { Velocity } from "../../../utils/types";

export async function getStartStopResponse(
  id: number,
  status: "started" | "stopped",
) {
  const url = `http://127.0.0.1:3000/engine?id=${id}&status=${status}`;
  try {
    const response = await fetch(url, {
      method: "PATCH",
    });
    if (!response.ok) {
      if (response.status === 400) {
        throw new Error(
          'Wrong parameters: "id" should be any positive number, "status" should be "started" or "stopped".',
        );
      } else if (response.status === 404) {
        throw new Error("Car with such id was not found in the garage.");
      } else {
        throw new Error("An unknown error occurred.");
      }
    }
    const data: Velocity = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getStartStopResponse:", error);
    throw error;
  }
}
