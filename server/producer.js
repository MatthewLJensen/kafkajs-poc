// import the `Kafka` instance from the kafkajs library
const { Kafka } = require("kafkajs")

// the client ID lets kafka know who's producing the messages
const clientId = "web-producer"
// we can define the list of brokers in the cluster
const brokers = ["localhost:29092"]
// this is the topic to which we want to write messages
const topic = "locations"

// initialize a new kafka client and initialize a producer from it
const kafka = new Kafka({ clientId, brokers })
const producer = kafka.producer()

// we define an async function that writes a new message each second
const produce = async (id, lat, lng) => {
    await producer.connect()
    let i = 0

    // after the produce has connected, we start an interval timer
    //setInterval(async () => {
    try {
        // send a message to the configured topic with
        // the key and value formed from the current value of `i`
        await producer.send({
            topic,
            messages: [
                { key: 'newlocation', value: JSON.stringify({
                    profileID: id,
                    latitude: lat,
                    longitude: lng
                })}
            ],
        })
        
        // await producer.send({
        //     topic,
        //     messages: [
        //         { key: 'testtest', value: JSON.stringify({name: 'big-mac'})},
        //     ],
        // })
        // if the message is written successfully, log it and increment `i`
        console.log("writes: ", id)
        i++
    } catch (err) {
        console.error("could not write message " + err)
    }
    //}, 1000)
}

module.exports = produce