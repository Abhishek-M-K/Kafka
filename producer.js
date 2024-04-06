const {kafka} = require("./client")

async function init(){
    const producer = kafka.producer()
    console.log("Producer connecting ...")

    await producer.connect();
    console.log("Producer connected successfully")
    
    await producer.send({
        topic: "ipl-match-updates",
        messages: [
            {
                partition: 0,
                key: "match-updates",
                value: "MI vs CSK"
            },
            {
                partition: 1,
                key: "match-updates",
                value: "RCB vs SRH"
            }
        ]
    });
    
    await producer.disconnect();
    console.log("Producer disconnected")
}

init();

