export interface UserLoginResponse {
  user: {
    login: string;
    isLogined: boolean;
  };
}

export interface UserLogoutResponse {
  user: {
    login: string;
    isLogined: boolean;
  };
}

export interface MessageSendResponse {
  message: {
    id: string;
    from: string;
    to: string;
    text: string;
    datetime: number;
    status: {
      isDelivered: boolean;
      isReaded: boolean;
      isEdited: boolean;
    };
  };
}

export interface MessageEditResponse {
  message: {
    id: string;
    text: string;
    status: {
      isEdited: boolean;
    };
  };
}

export interface MessageDeleteResponse {
  message: {
    id: string;
    status: {
      isDeleted: boolean;
    };
  };
}

export interface UserActiveResponse {
  users: Array<{
    login: string;
    isLogined: boolean;
  }>;
}

export interface UserInactiveResponse {
  users: Array<{
    login: string;
    isLogined: boolean;
  }>;
}

export interface MessageHistoryResponse {
  messages: Array<{
    id: string;
    from: string;
    to: string;
    text: string;
    datetime: number;
    status: {
      isDelivered: boolean;
      isReaded: boolean;
      isEdited: boolean;
    };
  }>;
}

export interface MessageReadResponse {
  message: {
    id: string;
    status: {
      isReaded: boolean;
    };
  };
}

export interface ErrorResponse {
  error: string;
}

export type WebSocketResponsePayload =
  | UserLoginResponse
  | UserLogoutResponse
  | MessageSendResponse
  | MessageEditResponse
  | MessageDeleteResponse
  | UserActiveResponse
  | UserInactiveResponse
  | MessageHistoryResponse
  | MessageReadResponse
  | ErrorResponse;
