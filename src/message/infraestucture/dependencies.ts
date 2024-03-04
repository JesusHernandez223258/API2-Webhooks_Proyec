import { SqliteMessageRepository } from "./sqlteMessageRepository";
import { AddMessageUseCase } from "../aplication/addMessageUseCase";
import { AddMessageController } from "./controllers/addMessageCotroller";

export const sqliteMessageRepository = new SqliteMessageRepository();

export const addMessageUseCase = new AddMessageUseCase(sqliteMessageRepository);
export const addMessageController = new AddMessageController(addMessageUseCase);