import type { WebSocketManager } from "../../utils/webSocketManager";
import type {
  UserLoginResponse,
  WebSocketResponsePayload,
} from "../../utils/responceTypes";

export async function loginUser(
  wsManager: WebSocketManager,
  login: string,
  password: string,
): Promise<{
  success: boolean;
  user?: { login: string; isLogined: boolean };
  error?: string;
}> {
  try {
    const response: WebSocketResponsePayload = await wsManager.sendRequest(
      "USER_LOGIN",
      {
        user: {
          login,
          password,
        },
      },
    );

    if (isUserLoginResponse(response)) {
      if (response.user.isLogined) {
        return { success: true, user: response.user };
      } else {
        return { success: false, error: "User is not logged in." };
      }
    } else {
      return { success: false, error: "Unexpected server response." };
    }
  } catch (error: any) {
    if (error.payload && error.payload.error) {
      return { success: false, error: error.payload.error }; // Сообщение об ошибке от сервера
    } else {
      return { success: false, error: "Произошла ошибка. Попробуйте снова." };
    }
  }
}

function isUserLoginResponse(
  response: WebSocketResponsePayload,
): response is UserLoginResponse {
  return (
    typeof response === "object" &&
    response !== null &&
    "user" in response &&
    typeof response.user === "object" &&
    "login" in response.user &&
    "isLogined" in response.user
  );
}
