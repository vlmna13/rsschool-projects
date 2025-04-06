export async function getWinnerResponse(
  id: number,
): Promise<{ id: number; wins: number; time: number }> {
  const url = `http://127.0.0.1:3000/winners/${id}`;

  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Winner with ID ${id} not found`);
      }
      throw new Error(`Failed to fetch winner: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Ошибка при получении данных победителя");
    } else {
      console.error("Неизвестная ошибка");
    }
    throw error;
  }
}
