import { Car } from "../../../utils/types";
import { createTrack } from "../raceField/createTrack";
import { createCarResponse } from "./functionCreateCarResponse";

export async function createCar(
  garageContainer: HTMLDivElement,
  name: string,
  color: string,
) {
  try {
    if (!name.trim()) {
      throw new Error("Car name cannot be empty");
    }
    const car: Car = await createCarResponse(name, color);
    if (!car) {
      throw new Error("Failed to create car");
    }
    const carEl = createTrack(car);
    garageContainer.append(carEl);
  } catch (error) {
    console.error("Error creating car:", error);
  }
}
