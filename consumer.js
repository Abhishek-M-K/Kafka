const { kafka } = require("./client");

async function init() {
  const consumer = kafka.consumer({ groupId: "test-1" });
  await consumer.connect();
  console.log("Consumer connected successfully");

  await consumer.subscribe({
    topic: "ipl-match-updates",
    fromBeginning: true, // This will ensure that we get all the messages from the beginning
  });
  console.log("Subscribed to topic successfully");

  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
        //messages are usually in buffer format, so we need to convert them to string
      console.log(`[${topic}]: PART: ${partition}:`, message.value.toString());
    },
  });
}

init();
