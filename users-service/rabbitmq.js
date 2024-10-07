const amqp = require('amqplib/callback_api');

let channel;

// Función para inicializar la conexión con RabbitMQ
const connectRabbitMQ = () => {
  amqp.connect('amqp://rabbitmq', (error0, connection) => {
    if (error0) {
      console.error(`Error al conectar a RabbitMQ: ${error0.message}`);
      setTimeout(connectRabbitMQ, 5000); // Reintentar después de 5 segundos
      return;
    }

    connection.createChannel((error1, ch) => {
      if (error1) {
        console.error(`Error al crear el canal: ${error1.message}`);
        setTimeout(connectRabbitMQ, 5000); // Reintentar después de 5 segundos
        return;
      }

      channel = ch;
      const queue = 'users_queue'; // Cola específica para users-service

      // Asegurarse de que la cola existe
      channel.assertQueue(queue, { durable: false });
      console.log(`Conectado a RabbitMQ y preparado para recibir mensajes en '${queue}'`);
    });
  });
};

// Función para enviar mensajes a la cola
const sendMessageToQueue = (message) => {
  if (channel) {
    channel.sendToQueue('users_queue', Buffer.from(message));
    console.log(`Mensaje enviado a la cola: ${message}`);
  } else {
    console.error('Error: Canal no está disponible.');
  }
};

module.exports = { connectRabbitMQ, sendMessageToQueue };
