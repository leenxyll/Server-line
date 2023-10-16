const chatbot = require('../chatbot/chatbot');
const textQuery = async(userText, userId) => {
    const resultQuery = await chatbot.textQuery(userText, userId);// function in chatbot js
    const jsonObject = JSON.parse(JSON.stringify(resultQuery))
    const fulfillmentText = jsonObject[0].queryResult.fulfillmentText;

//     const jsonObject = JSON.parse(JSON.stringify(response));
// const fulfillmentText = jsonObject[0].queryResult.fulfillmentText;
    console.log(resultQuery);
    console.log(fulfillmentText);
    return fulfillmentText;
}

module.exports = {
    textQuery
    // app.post('/text_query', async (req, res) => {
        // console.log(req)
        // const {text, userId} = req.body;
        // const resultQuery = await chatbot.textQuery(text, userId)// function in chatbot js
        // console.log(resultQuery)
        // res.send("Text Query")
    // })

    // app.post('/event_query', (req, res) => {
    //     console.log(req)
    //     res.send("Event Query")
    // })
}