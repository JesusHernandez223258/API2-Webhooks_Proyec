import { Request, Response } from "express";
import { AddMessageUseCase } from "../../aplication/addMessageUseCase";

export class AddMessageController {
  constructor(readonly addMessageUseCase: AddMessageUseCase) {}
  async run(req: Request, res: Response) {
    try {
      let { content } = req.body;
      let createMessage = await this.addMessageUseCase.run(content);
      if (createMessage) {
        return res.status(200).send({
          status: "success",
          data: {
            content: createMessage.content,
          },
          message: " Mensaje creado",
        });
      } else {
        return res.status(400).send({
          status: "Error",
          data: [],
          message: "Error al Crear el Mensaje",
        });
      }
    } catch (error) {
      console.log("Error en messageController", error);
      res.status(500).send({
        status: "error",
        message: "Error en Server",
      });
    }
  }
}