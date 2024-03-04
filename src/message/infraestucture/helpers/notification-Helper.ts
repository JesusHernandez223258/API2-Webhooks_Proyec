import { INotificationService } from "../../aplication/Service/NotificationService";
import ampqlib from "amqplib";

export class NotificationHelpers implements INotificationService {
  providerChannel: ampqlib.Channel | undefined;

  async inicializar() {
    try {
      const connection = await ampqlib.connect(
        "amqp://Jal:123456@3.220.154.109"
      );
      this.providerChannel = await connection.createChannel();
      console.log("Conexión exitosa");
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  sendNotify(message: string): boolean {
    if (this.providerChannel === undefined) {
      return false;
    }
    const exchange = "Prueba";
    this.providerChannel.assertExchange(exchange, "direct", { durable: true });
    this.providerChannel.publish(exchange, "12345", Buffer.from(message));
    console.log("Mensaje enviado al exchange:", exchange);
    return true;
  }
}
