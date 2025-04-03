// import { Car } from "../../../utils/types";
// import { Track } from "../raceField/createTrack";
// import { createCarResponse } from "./functionCreateCarResponse";

// export async function createCar(
//   garageContainer: HTMLDivElement,
//   name: string,
//   color: string,
// ) {
//   try {
//     const car: Car = await createCarResponse(name.trim(), color);
//     if (!car) {
//       throw new Error("Failed to create car");
//     }
//     const carEl = new Track(car);
//     garageContainer.append(carEl.render());
//   } catch (error) {
//     console.error("Error creating car:", error);
//   }
// }
