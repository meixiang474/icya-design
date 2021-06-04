import { App } from "vue";

export interface MessageFunction {
  (options: MessageParams): void;
  install?: (app: App) => void;
  success: (options: MessageParams) => void;
  error: (options: MessageParams) => void;
  info: (options: MessageParams) => void;
  warning: (options: MessageParams) => void;
}

export type MessageType = "success" | "error" | "info" | "warning";

export interface MessageOptions {
  id?: string;
  message?: string;
  type?: MessageType;
  duration?: number;
  onClose?: (id: string) => any;
  offset?: number;
}

export type MessageParams = MessageOptions | string;
