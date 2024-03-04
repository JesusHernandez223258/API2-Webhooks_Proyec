const amqp = require('amqplib');
const axios = require('axios');

async function recibirEvento() {
    const connection = await amqp.connect('amqp://Jal:123456@3.220.154.109');
    const channel = await connection.createChannel();

    const exchange = 'Prueba';

    await channel.assertExchange(exchange, 'direct', { durable: true });

    const queueName = 'initial';
    const queue = await channel.assertQueue(queueName, { exclusive: false });
    await channel.bindQueue(queue.queue, exchange, '12345');

    console.log('Escuchando eventos de RabbitMQ');

    channel.consume(queue.queue, async (mensaje) => {
        if (mensaje !== null) {
            console.log(`Mensaje recibido de RabbitMQ: ${mensaje.content.toString()}`);
            // Enviar el mensaje a través de una solicitud POST a una API externa
            try {
                const response = await axios.post('http://localhost:3001/mensaje', {
                    contenido: mensaje.content.toString()
                });
                console.log("Respuesta de la API externa:",response.data);
            } catch (error) {
                console.error("Error al enviar el mensaje a la API externa:", error);
            }
        }
    }, { noAck: true });
}

recibirEvento().catch(console.error);