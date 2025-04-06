export async function deleteCar(carId: number): Promise<boolean> {
  const url = `http://127.0.0.1:3000/garage/${carId}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
