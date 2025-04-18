import type { WebSocketManager } from "../../../utils/webSocketManager";
import type {
  UserActiveResponse,
  UserInactiveResponse,
} from "../../../utils/responceTypes";

export async function fetchAllUsers(
  wsManager: WebSocketManager,
): Promise<{ login: string; isLogined: boolean }[]> {
  try {
    const savedUser = sessionStorage.getItem("user");
    let currentUserLogin = "";

    if (savedUser) {
      const currentUser = JSON.parse(savedUser);
      currentUserLogin = currentUser.login;
    }
    const activeUsersResponse = await wsManager.sendRequest<
      { id: string; type: "USER_ACTIVE"; payload: null },
      UserActiveResponse
    >("USER_ACTIVE", {
      id: crypto.randomUUID(),
      type: "USER_ACTIVE",
      payload: null,
    });
    const activeUsers = activeUsersResponse.users || [];

    const inactiveUsersResponse = await wsManager.sendRequest<
      { id: string; type: "USER_INACTIVE"; payload: null },
      UserInactiveResponse
    >("USER_INACTIVE", {
      id: crypto.randomUUID(),
      type: "USER_INACTIVE",
      payload: null,
    });
    const inactiveUsers = inactiveUsersResponse.users || [];
    const allUsers = [...activeUsers, ...inactiveUsers];
    const filteredUsers = allUsers.filter(
      (user) => user.login !== currentUserLogin,
    );
    return filteredUsers;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}
