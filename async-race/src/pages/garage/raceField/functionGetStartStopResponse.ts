import { Velocity } from "../../../utils/types";

export enum StartStopErrorCode {
  WRONG_PARAMETERS = "WRONG_PARAMETERS",
  NOT_FOUND = "NOT_FOUND",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
  NETWORK_ERROR = "NETWORK_ERROR",
}

export type StartStopError = {
  code: StartStopErrorCode;
};

export async function getStartStopResponse(
  id: number,
  status: "started" | "stopped",
): Promise<Velocity | StartStopError> {
  const url = `http://127.0.0.1:3000/engine?id=${id}&status=${status}`;
  try {
    const response = await fetch(url, {
      method: "PATCH",
    });
    const data: Velocity = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      // Возвращаем код ошибки на основе сообщения
      switch (error.message) {
        case "HTTP 400":
          return { code: StartStopErrorCode.WRONG_PARAMETERS };
        case "HTTP 404":
          return { code: StartStopErrorCode.NOT_FOUND };
        default:
          return { code: StartStopErrorCode.UNKNOWN_ERROR };
      }
    }
    return { code: StartStopErrorCode.NETWORK_ERROR };
  }
}
