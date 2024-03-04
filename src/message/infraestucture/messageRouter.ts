import express from "express";
import { addMessageController } from "./dependencies";

export const messageRouter = express.Router();

messageRouter.post('/', (req, res) => {
  addMessageController.run(req, res)
    .then(() => {
      return null;
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
})