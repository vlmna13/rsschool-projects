import { Move } from "../../../utils/types";
export enum MoveErrorCode {
  WRONG_PARAMETERS = "WRONG_PARAMETERS",
  NOT_FOUND = "NOT_FOUND",
  TOO_MANY_REQUESTS = "TOO_MANY_REQUESTS",
  ENGINE_BROKEN = "ENGINE_BROKEN",
  NETWORK_ERROR = "NETWORK_ERROR",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
}

export async function moveCarResponse(id: number) {
  const url = `http://127.0.0.1:3000/engine?id=${id}&status=drive`;
  try {
    const response = await fetch(url, {
      method: "PATCH",
    });

    // Проверяем статус ответа
    if (!response.ok) {
      switch (response.status) {
        case 400:
          return { code: MoveErrorCode.WRONG_PARAMETERS };
        case 404:
          return { code: MoveErrorCode.NOT_FOUND };
        case 429:
          return { code: MoveErrorCode.TOO_MANY_REQUESTS };
        case 500:
          return { code: MoveErrorCode.ENGINE_BROKEN };
        default:
          return { code: MoveErrorCode.UNKNOWN_ERROR };
      }
    }
    const data: Move = await response.json();
    return data;
  } catch (error) {
    // Обработка сетевых ошибок
    return { code: MoveErrorCode.NETWORK_ERROR };
  }
}
