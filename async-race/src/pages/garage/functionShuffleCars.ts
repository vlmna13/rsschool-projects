import { CarData } from "../../data/carsData";
import { ShuffleCars } from "../../utils/types";
export function shuffleCars(cars: CarData): ShuffleCars {
  const allCars: ShuffleCars = [];
  Object.entries(cars).forEach(([manufacturer, models]) => {
    models.forEach((model) => {
      allCars.push(manufacturer + " " + model);
    });
  });
  const shuffledCars = allCars.sort(() => Math.random() - 0.5);
  return shuffledCars;
}
