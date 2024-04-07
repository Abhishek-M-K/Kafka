const { kafka } = require("./client");
const readline = require("readline");

const cli = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function init() {
  const producer = kafka.producer();
  console.log("Producer connecting ...");

  await producer.connect();
  console.log("Producer connected successfully");

  cli.setPrompt("> ");
  cli.prompt();

  cli
    .on("line", async function (line) {
      const [team, result] = line.split(" ");
      await producer.send({
        topic: "ipl-match-updates",
        messages: [
          {
            partition: result.toLowerCase() === "won" ? 0 : 1,
            key: "match-updates",
            value: JSON.stringify({ teamName: team, result }),
          },
        ],
      });
    })
    .on("close", async () => {
      await producer.disconnect();
    });
  console.log("Producer disconnected");
}

init();
