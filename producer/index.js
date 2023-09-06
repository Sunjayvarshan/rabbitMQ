const amqp = require("amqplib"); // ampq full form advanced message query protocol

connect();
async function connect() {
  try {
    const connection = await amqp.connect("amqp://127.0.0.1:5672"); // connect to the rabbitMQ server
    const channel = await connection.createChannel(); //create channel
    const queue = "message"; //queue name
    await channel.purgeQueue(queue); //purge the duplicate message
    await channel.assertQueue(queue, { durable: false }); // assert queue if make sure it exists
    const msg = { id: 1, name: "Hello World" }; //message to be sent
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
    console.log("Messaage sent", msg);
    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 1000);
  } catch (error) {
    console.log(error);
  }
}
