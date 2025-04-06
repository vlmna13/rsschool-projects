export async function deleteWinner(id: number): Promise<boolean> {
  try {
    const response = await fetch(`http://127.0.0.1:3000/winners/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}
