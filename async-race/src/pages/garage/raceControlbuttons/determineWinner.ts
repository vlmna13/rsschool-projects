import { getWinnerResponse } from "./functionGetWinnerResponse";
import { createWinnerResponse } from "./functionCreateWinnerResponse";
import { updateWinnerResponse } from "./functionUpdateWinnerResponce";
import { showWinner } from "./functionShowWinner";

export async function determineWinner(
  id: number,
  time: number,
): Promise<HTMLDivElement | void> {
  try {
    const winner = await getWinnerResponse(id);
    const newWins = winner.wins + 1;
    const roundedTime = Math.round((time / 1000) * 100) / 100;
    const newTime = roundedTime < winner.time ? roundedTime : winner.time;

    await updateWinnerResponse(id, newWins, newTime);
    await showWinner(id, roundedTime);
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      // Если победитель не найден, создаём нового
      const roundedTime = Math.round((time / 1000) * 100) / 100;
      await createWinnerResponse(id, 1, roundedTime);
      await showWinner(id, roundedTime);
    } else {
      // Обрабатываем другие ошибки
      console.error("Ошибка при обработке победителя:");
    }
  }
}
