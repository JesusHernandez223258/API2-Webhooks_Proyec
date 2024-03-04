import { Message } from "../domain/message";
import { MessageRepository } from "../domain/ImessageRepository";

export class AddMessageUseCase {
  constructor(readonly messageRepository: MessageRepository) {}
  async run( content: string ): Promise<Message | null> {
    try {
      const createMessage = await this.messageRepository.addMessage(content);
      return createMessage;
    } catch (error) {
      return null;
    }
  }
}