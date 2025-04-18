import type { WebSocketMessage, WebSocketRequestPayload } from "./requestTypes";
import type { WebSocketResponsePayload } from "./responceTypes";

const reconnectInterval = 2000;

export class WebSocketManager {
  private socket: WebSocket | null = null;
  private url: string;
  private requestHandlers: Map<
    string,
    (payload: WebSocketResponsePayload) => void
  > = new Map();
  private eventHandlers: Map<
    string,
    (payload: WebSocketResponsePayload) => void
  > = new Map();
  private shouldReconnect: boolean = true;

  constructor(url: string) {
    this.url = url;
    this.connect();
  }
  public sendRequest<
    T extends WebSocketRequestPayload,
    R extends WebSocketResponsePayload,
  >(type: string, payload: T): Promise<R> {
    return new Promise((resolve, reject) => {
      console.log("Sending request:", { type, payload });
      const id = crypto.randomUUID();
      const message: WebSocketMessage<T> = { id, type, payload };
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify(message));
        // Указываем тип обработчика для конкретного запроса
        this.requestHandlers.set(id, (payload: WebSocketResponsePayload) => {
          if (this.isExpectedResponse<R>(payload)) {
            resolve(payload);
          } else {
            reject(new Error("Unexpected response type."));
          }
        });
      } else {
        reject(new Error("WebSocket is not connected."));
      }
    });
  }

  public addEventHandler(
    type: string,
    handler: (payload: WebSocketResponsePayload) => void,
  ): void {
    this.eventHandlers.set(type, handler);
  }

  public removeEventHandler(type: string): void {
    if (this.eventHandlers.has(type)) {
      this.eventHandlers.delete(type);
    }
  }

  private connect(): void {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = (): void => {
      console.log("WebSocket connection established.");
    };

    this.socket.onmessage = (event): void => {
      this.handleMessage(event.data);
    };

    this.socket.onerror = (error): void => {
      console.error("WebSocket error:", error);
    };

    this.socket.onclose = (): void => {
      console.log("WebSocket connection closed.");
      if (this.shouldReconnect) {
        console.log("Reconnecting...");
        setTimeout(() => this.connect(), reconnectInterval);
      }
    };
  }

  private handleMessage(data: string): void {
    try {
      const message: WebSocketMessage<WebSocketResponsePayload> =
        JSON.parse(data);
      const { id, type, payload } = message;
      if (id && this.requestHandlers.has(id)) {
        const handler = this.requestHandlers.get(id);
        if (handler) {
          if (this.isExpectedResponse(payload)) {
            handler(payload);
          } else {
            console.error("Unexpected response type for request ID:", id);
          }
        }
        this.requestHandlers.delete(id);
      } else if (type && this.eventHandlers.has(type)) {
        const handler = this.eventHandlers.get(type);
        if (handler) {
          handler(payload);
        }
      } else {
        console.warn("Unhandled message:", message);
      }
    } catch (error) {
      console.error("Error parsing message:", error);
    }
  }

  private isExpectedResponse<R extends WebSocketResponsePayload>(
    payload: WebSocketResponsePayload,
  ): payload is R {
    return true;
  }
}
