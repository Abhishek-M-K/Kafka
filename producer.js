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
                value: "CSK vs MI"
            },
            {
                partition: 1,
                key: "match-updates",
                value: "SRH vs RCB"
            }
        ]
    });
    
    await producer.disconnect();
    console.log("Producer disconnected")
}

init();

