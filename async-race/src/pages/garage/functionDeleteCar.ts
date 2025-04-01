export async function deleteCar(carId: number): Promise<boolean> {
  const url = `http://127.0.0.1:3000/garage/${carId}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (response.ok) {
      return true;
    } else {
      console.error(`Failed to delete car with ID ${carId}.`);
      return false;
    }
  } catch (error) {
    console.error("Error deleting car:", error);
    return false;
  }
}
