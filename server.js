const line = require('@line/bot-sdk');
const routes = require('./routes/df-routes');
const express = require('express');
const axios = require('axios').default;
const dotenv = require('dotenv');
const port = process.env.PORT || 3030;
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const env = dotenv.config().parsed;

const lineConfig = {
    channelAccessToken: env.ACCESS_TOKEN,
    channelSecret: env.SECRET_TOKEN
};

// app.use(bodyParser.urlencoded({extended: false}))
// app.use(bodyParser.json())
// app.get('/df/server', (req, res)=>{
//     res.send("Hi, from server"); //response from server
// })

const client = new line.Client(lineConfig);

app.post('/webhook', line.middleware(lineConfig), async (req, res) => { 
    try{
        const events = req.body.events;
        console.log('events=>>>>>',events);
        return events.length > 0 ? await events.map(item => handleEvent(item)) : res.status(200).send("OK");
    }catch(err){
        res.status(500).send();
    }
});

const handleEvent = async (event) => {
    // console.log(event);
    if(event.type === 'message' && event.message.type === 'text'){
        const text = event.message.text;
        const userId = event.source.userId
        console.log("++++ "+text+" && "+userId+" ++++");
        // const {text, userId} = req.body;
        // routes.textQuery(text, userId);
        const resultQuery = await routes.textQuery(text, userId)// function in chatbot js
        return client.replyMessage(event.replyToken, {"type": "text", "text": resultQuery})
        

        // event.require('./routes/df-routes')(app);
        // console.log("Received text message");
        // return client.replyMessage(event.replyToken, {"quickReply": {
        //     "items": [
        //         {
        //             "type": "action",
        //             "action": {
        //                 "type": "camera",
        //                 "label": "ถ่ายภาพ"
        //             }
        //         },
        //         {
        //             "action": {
        //                 "label": "เลือกรูปภาพ",
        //                 "type": "cameraRoll"
        //             },
        //             "type": "action"
        //         }
        //     ]
        // },
        // "text": "กรุณาส่งรูปภาพที่ต้องการ",
        // "type": "text"})
    } else if(event.type === 'message' && event.message.type === 'image'){
        console.log("Received image event");
        const msgId = event.message.id;
        // line.getMessage(msgId).then()
        console.log("==Message ID is " + msgId + "===");
        return client.replyMessage(event.replyToken, {"type": "text", "text": "ไม่บอกหรอกว่ายาอะไร"});
    }
}

app.listen(port, ()=>{
    console.log('listening on port ' + port);
});