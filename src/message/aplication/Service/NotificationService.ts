import ampqlib from "amqplib";

export interface INotificationService {
  providerChannel: ampqlib.Channel | undefined;

  inicializar(): Promise<boolean>;

  sendNotify(message: string): boolean;
}
