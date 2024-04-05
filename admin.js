const {kafka} = require("./client")

async function init(){
    const admin = kafka.admin()
    if(admin) console.log("Admin connected")
    admin.connect();

    admin.createTopics({
        topics:[
            {
                topic: "ipl-match-updates",
                numPartitions: 2
            }
        ]
    })

    console.log("Topic created")
    console.log("Disconnecting ...")

    await admin.disconnect();
}

init();