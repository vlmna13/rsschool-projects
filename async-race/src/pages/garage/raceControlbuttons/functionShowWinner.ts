import { createElement } from "../../../utils/createElement";
import { getCar } from "../functionGetCar";
import "./raceControlButtons.css";

export async function showWinner(
  id: number,
  time: number,
): Promise<HTMLDivElement | void> {
  const winner = await getCar(id);
  if (!winner) {
    console.error("Winner not found");
    return;
  }
  const winnerName = winner.name;
  const winnerElement = createElement<HTMLDivElement>({
    tag: "div",
    classNames: ["winner"],
    textContent: `Winner: ${winnerName}, time: ${time}`,
  });
  document.body.append(winnerElement);
  return winnerElement;
}
