const {Kafka} = require("kafkajs")

exports.kafka = new Kafka({
    clientId: 'ipl-updates',
    brokers: ["localhost:9094"]
})
