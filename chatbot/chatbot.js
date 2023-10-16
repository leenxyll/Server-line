// connect df with server 

// text query
// event query

const dialogflow = require('dialogflow');
const config = require('../config/devkey'); //googleProject

const privateKey = config.googlePrivateKey;
const projectId = config.googleProjectID;
const sessionId = config.dialogFlowSessionID;

const credentials = {
    client_email: config.googleClientEmail,
    private_key: config.googlePrivateKey
}
const sessionClient = new dialogflow.SessionsClient({projectId, credentials});
// const sessionPath = sessionClient.sessionPath(projectId, sessionId);

const textQuery = async(userText, userId) => {
    const sessionPath = sessionClient.sessionPath(projectId, sessionId+userId);
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: userText,
                languageCode: config.dialogFlowSessionLanguageCode
            }
        }
    }

    try{
        const response = await sessionClient.detectIntent(request)
        // console.log(response)
        return response
    }catch(err){
        console.log(err)
        return err
    }
    //connect with df api
    //detect the intent
    //filter out
    //send res
}

module.exports = {
    textQuery
}