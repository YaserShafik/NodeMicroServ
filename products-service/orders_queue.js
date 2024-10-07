const amqp = require('amqplib/callback_api');

let queue = 'orders_queue';
let channel;

const connectRabittMQ_Products = () => {
  amqp.connect('amqp://rabbitmq', function (error0, connection) {
    if (error0) {
      console.error(`Error al conectar a RabbitMQ: ${error0.message}`);
      setTimeout(connectRabittMQ_Products, 5000); // Reintentar después de 5 segundos
      return;
    }

    connection.createChannel(function (error1, ch) {
      if (error1) {
        console.error(`Error al crear el canal: ${error1.message}`);
        setTimeout(connectRabittMQ_Products, 5000); // Reintentar después de 5 segundos
        return;
      }

      channel = ch;

      // Asegurarse de que la cola existe
      channel.assertQueue(queue, { durable: false });

      console.log(`Esperando mensajes en la cola ${queue}`);
    });
  });
};

const getMessageFromQueue = () => {
  if (!channel) {
    console.error("Error: canal no disponible");
    return;
  }
  channel.consume(queue, function (msg) {
    const order = JSON.parse(msg.content.toString());
    console.log(`Pedido recibido: ${JSON.stringify(order)}`);
  }, { noAck: true });
};

module.exports = { connectRabittMQ_Products, getMessageFromQueue };
