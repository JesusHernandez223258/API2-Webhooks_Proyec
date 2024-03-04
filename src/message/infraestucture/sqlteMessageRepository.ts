import { Message } from "../domain/message";
import { MessageRepository } from "../domain/ImessageRepository";
import MessageModel from "./models/messageModel";

export class SqliteMessageRepository implements MessageRepository {
  async addMessage(content: string): Promise<Message | null> {
    try {
      const createdMessage = await MessageModel.create({ content });
      return new Message(
        createdMessage.id,
        createdMessage.content,
        createdMessage.timestamp
      );
    } catch (error) {
      console.log("Error en SQLite al agregar mensaje:", error);
      return null;
    }
  }
}
