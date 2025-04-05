export async function updateWinnerResponse(
  id: number,
  wins: number,
  time: number,
): Promise<void> {
  const url = `http://127.0.0.1:3000/winners/${id}`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ wins, time }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update winner: ${response.statusText}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Ошибка при обновлении победителя:");
    } else {
      console.error("Неизвестная ошибка:");
    }
  }
}
