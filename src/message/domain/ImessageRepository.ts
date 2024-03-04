import { Message } from "./message";

export interface MessageRepository {
  addMessage(content: string): Promise<Message | null>;
}
