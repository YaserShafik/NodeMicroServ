const amqp = require('amqplib/callback_api');

let channel;

// Función para inicializar la conexión con RabbitMQ
const connectRabbitMQ = () => {
  amqp.connect('amqp://rabbitmq', (error0, connection) => {
    if (error0) {
      throw error0;
    }

    connection.createChannel((error1, ch) => {
      if (error1) {
        throw error1;
      }

      channel = ch;
      const queue = 'orders_queue';

      // Asegurarse de que la cola existe
      channel.assertQueue(queue, { durable: false });
    });
  });
};

// Función para enviar mensajes a la cola
const sendMessageToQueue = (message) => {
  channel.sendToQueue('orders_queue', Buffer.from(message));
  console.log(`Mensaje enviado a la cola: ${message}`);
};

module.exports = { connectRabbitMQ, sendMessageToQueue };
