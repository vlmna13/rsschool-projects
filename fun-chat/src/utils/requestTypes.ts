export interface UserLoginRequest {
  user: {
    login: string;
    password: string;
  };
}

export interface UserLogoutRequest {
  user: {
    login: string;
    password: string;
  };
}

export interface MessageSendRequest {
  message: {
    to: string;
    text: string;
  };
}

export interface MessageEditRequest {
  message: {
    id: string;
    text: string;
  };
}

export interface MessageDeleteRequest {
  message: {
    id: string;
  };
}

export interface MessageHistoryRequest {
  user: {
    login: string;
  };
}

export interface MessageReadRequest {
  message: {
    id: string;
  };
}

export type WebSocketMessage<T = any> = {
  id: string | null;
  type: string;
  payload: T;
};

export type WebSocketRequestPayload =
  | UserLoginRequest
  | UserLogoutRequest
  | MessageSendRequest
  | MessageEditRequest
  | MessageDeleteRequest
  | MessageHistoryRequest
  | MessageReadRequest
  | WebSocketMessage;
