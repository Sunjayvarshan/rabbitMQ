const amqp = require("amqplib"); // ampq full form advanced message query protocol

connect();
async function connect() {
  try {
    const connection = await amqp.connect("amqp://127.0.0.1:5672"); // connect to the rabbitMQ server
    const channel = await connection.createChannel(); //create channel
    const queue = "message"; //queue name
    await channel.assertQueue(queue, { durable: false }); // assert queue if make sure it exists
    channel.consume(queue, (message) => {
      //consume message and queue and log it
      const input = JSON.parse(message.content.toString());
      console.log(`Received message: ${input.name}`);
      channel.ack(message);
      setTimeout(() => {
        connection.close();
      }, 1000);
    });
  } catch (error) {
    console.log(error);
  }
}
