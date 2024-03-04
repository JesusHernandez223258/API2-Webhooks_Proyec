import express, { Express, NextFunction, Request, Response } from "express";
import * as crypto from "crypto";
import axios from "axios";

const webhookUrl =
  "https://discord.com/api/webhooks/1206622426079957054/tR_OCUbyPglbXG6limh8PzFLN9LOkmWsydSfFvPN9krdDu5_nQzPc5RYbEZ6fKDjg3I-";
const app: Express = express();
const port: number = 8080;

const verity_sgnature = (req: Request) => {
  try {
    const asignature = crypto.createHmac("sha256", "1234").update(JSON.stringify(req.body)).digest("hex");
    const truste = Buffer.from(`sha256=${asignature}`, `ascii`);
    const untrused = Buffer.from(req.header("X-Hub-Signature-256") || '', 'ascii');

    return crypto.timingSafeEqual(truste, untrused);
  } catch (error) {
    return false;
  }
}

const verifySignatureMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!verity_sgnature(req)) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    })
  }
  next();
}

app.use(express.json())

app.post('/github-event', (req: Request, res: Response) => {
  const { body } = req;
  const { action, sender, repository } = body;
  const event = req.header(`x-github-event`);
  let message = "";

  switch (event) {
    case "star":
      message = `${sender.login} ${action} start on ${repository.full_name}`;
      break;
    case "issue":
      const { issue } = body;
      message = `${sender.login} ${action} issue ${issue.title} on ${repository.full_name}`;
      break;
    case "push":
      message = `${sender.login} pushes on  on ${repository.full_name}`;
      break;
    default:
      message = `Evento desconosido${event}`;
      break;
  };

  enviarMensajeADiscord(message);
  console.log(message);

  res.status(200).json({
    success:true
  })
  
})

function enviarMensajeADiscord(message: string) {
  axios
    .post(webhookUrl, { content: message })
    .then((response) => {
      console.log("Mensaje enviado exitosamente a Discord");
    })
    .catch((error) => {
      console.error("Error al enviar el mensaje a Discord:", error);
    });
}

app.listen(8080, () => console.log(`El servidor esta corriendo en el puerto ${port}`))