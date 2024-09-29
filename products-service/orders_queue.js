const amqp = require('amqplib/callback_api');

let queue = 'orders_queue';
let channel;

// Conectar a RabbitMQ
const connectRabittMQ_Products =  () =>{
    amqp.connect('amqp://rabbitmq', function(error0, connection) {
        if (error0) {
          throw error0;
        }
      
        // Crear un canal para recibir mensajes
        connection.createChannel(function(error1, ch) {
          if (error1) {
            throw error1;
          }
      
          channel = ch;
      
          // Asegurarse de que la cola existe
          channel.assertQueue(queue, { durable: false });
      
          console.log(`Esperando mensajes en la cola ${queue}`);
          
          if (callback) callback();
        });
    });
}

const getMessageFromQueue = () =>{
    if(!channel){
        console.log("Error: canal no disponible");
        return;
    }
    // Recibir mensajes de la cola
    channel.consume(queue, function(msg) {
        const order = JSON.parse(msg.content.toString());
        console.log(`Pedido recibido: ${JSON.stringify(order)}`);

    // Procesar el pedido, por ejemplo, reducir el inventario
    // Aquí podrías tener tu lógica de negocio para manejar los pedidos
    
    }, { noAck: true });  // 'noAck: true' significa que el mensaje no requiere confirmación
}


module.exports = {connectRabittMQ_Products, getMessageFromQueue}