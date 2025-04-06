import { Winners } from "../../../utils/types";
import { getCar } from "../../garage/functionGetCar";
import { CreateMember } from "./createMember";

export async function renderWinners(
  fieldWrapper: HTMLDivElement,
  dataWinners: Winners,
  currentPage: number,
  limit: number,
): Promise<void> {
  while (fieldWrapper.children.length > 1) {
    fieldWrapper.lastChild?.remove();
  }
  const carIds = dataWinners.map((winner) => winner.id);
  const carPromises = carIds.map((id) => getCar(id));
  const cars = await Promise.all(carPromises);
  const offset = (currentPage - 1) * limit;
  dataWinners.forEach((winner, index) => {
    const car = cars.find((c) => c.id === winner.id);
    if (car) {
      const member = new CreateMember(
        offset + index + 1,
        car.color,
        car.name,
        winner.wins,
        winner.time,
      );
      fieldWrapper.append(member.render());
    }
  });
}
