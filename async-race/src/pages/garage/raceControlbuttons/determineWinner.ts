import { getWinnerResponse } from "./functionGetWinnerResponse";
import { createWinnerResponse } from "./functionCreateWinnerResponse";
import { updateWinnerResponse } from "./functionUpdateWinnerResponce";

export async function determineWinner(id: number, time: number): Promise<void> {
  try {
    const winner = await getWinnerResponse(id);
    const newWins = winner.wins + 1;
    const roundedTime = Math.round(time * 100) / 100;
    const newTime = roundedTime < winner.time ? roundedTime : winner.time;

    await updateWinnerResponse(id, newWins, newTime);
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      // Если победитель не найден, создаём нового
      await createWinnerResponse(id, 1, time);
      console.log(
        `Победитель создан: ID ${id}, Победы: 1, Лучшее время: ${time}`,
      );
    } else {
      // Обрабатываем другие ошибки
      console.error("Ошибка при обработке победителя:", error);
      throw error; // Пробрасываем ошибку для обработки на уровне вызова
    }
  }
}
