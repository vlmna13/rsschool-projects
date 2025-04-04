export async function createWinnerResponse(
  id: number,
  wins: number,
  time: number,
): Promise<void> {
  const url = `http://127.0.0.1:3000/winners`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, wins, time }),
    });

    if (!response.ok) {
      if (response.status === 500) {
        throw new Error("Insert failed, duplicate id");
      }
      throw new Error(`Failed to create winner: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Winner created successfully:", data);
  } catch (error) {
    // Проверяем, является ли ошибка объектом типа Error
    if (error instanceof Error) {
      if (error.message === "Insert failed, duplicate id") {
        console.error("Ошибка: дублирующийся ID победителя.");
      } else {
        console.error("Ошибка при создании победителя:", error.message);
      }
    } else {
      console.error("Неизвестная ошибка:", error);
    }
    throw error; // Пробрасываем ошибку для обработки на уровне вызова
  }
}
