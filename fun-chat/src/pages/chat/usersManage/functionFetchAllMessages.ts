import type { MessageHistoryRequest } from "../../../utils/requestTypes";
import type { MessageHistoryResponse } from "../../../utils/responceTypes";
import type { WebSocketManager } from "../../../utils/webSocketManager";

export async function fetchAllMessages(
  wsManager: WebSocketManager,
  users: { login: string; isLogined: boolean }[],
): Promise<{ login: string; messages: MessageHistoryResponse["messages"] }[]> {
  try {
    const messagesByUser = await Promise.all(
      users.map(async (user) => {
        try {
          const response = await wsManager.sendRequest<
            MessageHistoryRequest,
            MessageHistoryResponse
          >("MSG_FROM_USER", {
            user: { login: user.login },
          });
          if (response?.messages) {
            return {
              login: user.login,
              messages: response.messages,
            };
          } else {
            return { login: user.login, messages: [] };
          }
        } catch {
          return { login: user.login, messages: [] };
        }
      }),
    );
    console.log("Messages by user:", messagesByUser);
    return messagesByUser;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
}
