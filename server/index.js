const produce = require("./producer")
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 3000

let i = 0


// We are using our packages here
app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
 extended: true})); 
app.use(cors())

//You can use this to check if your server is working
app.get('/', (req, res)=>{
res.send("Welcome to your server")
})


//Route that handles login logic
app.post('/produce', (req, res) =>{
    produceEvent(i.toString(), req.body.lat, req.body.lng)
    i++
    res.send("Message sent")
})


//Start your server on a specified port
app.listen(port, ()=>{
    console.log(`Server is runing on port ${port}`)
})


function produceEvent(id, lat, lng) {
    // call the `produce` function and log an error if it occurs
    produce(id, lat, lng).catch((err) => {
        console.error("error in producer: ", err)
    })

}