const axios = require("axios");
const firebase = require("./firebase.repository.js");


//Variaveis do USER
const accessTokenClient = "EAAM4fCQtPIQBO7G08k8tP2BTtZAshEEmcyEePHZB8ZCjBGqy7PwzF3BGhm8uUpAUeA2keNG8Gc5IB6bMocZC0VLfUwAF7ZC22ZArkeLZAXqAd6QytBwAzmrRXHqNFRMt4zGyVcYfA6w5ndu0x3FjSUC7derXUNFziCiKdSdJYVJC40eTfCQBh36GmgZBBsFHUTc3"
const fromPhoneId = "207945742400750"
const phoneUser = "5561999927159"


const url = "https://graph.facebook.com/v18.0/" + fromPhoneId + "/messages";

const headers = {
    Authorization: `Bearer ${accessTokenClient}`,
    "Content-Type": "application/json",
};


async function sendTextMessage(textMessage, targetPhone) {
    const data = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: targetPhone,
        type: "text",
        text: {
            preview_url: false,
            body: textMessage,
        },
    };
    const pathDb = "Conversas/" + phoneUser + "/" + targetPhone

    try {
        const response = await axios.post(url, data, { headers });
        const objFirebase = {
            idMessage: response.data.messages[0].id,
            message: textMessage,
            sintaxMesage: "free",
            type: "send",
            status: "send",
            timeStamp: Math.round(Date.now() / 1000),
        };
        console.log("======> [WPPService/sendTextMessage] -> mensagem de texto enviada para -> ", targetPhone)
        firebase.sendMessage(objFirebase, pathDb)
        return objFirebase
    } catch (e) {
        console.log("======> [MessageService/sendTextMessage] ERRO -> ", e.response.data)
        return e.response.data

    }
}

async function sendTemplate(idTemplate, targetPhone) {

    const pathDb = "Templates/" + phoneUser
    const pathDbConversa = "Conversas/" + phoneUser + "/" + targetPhone

    try {
        const responseTemplate = await firebase.getTemplate(idTemplate, pathDb);
        responseTemplate.to = targetPhone
        const responseWpp = await axios.post(url, responseTemplate, { headers });
        
        const objFirebase = {
            idMessage: responseWpp.data.messages[0].id,
            message: responseTemplate.interactive.body.text,
            sintaxMesage: idTemplate,
            type: "send",
            status: "send",
            timeStamp: Math.round(Date.now() / 1000),
        };

        console.log("======> [WPPService/sendTemplate] -> template enviado para -> ", targetPhone)
        firebase.sendMessage(objFirebase, pathDbConversa)
        return objFirebase

    } catch (e) {
        console.log("ERRO -> ", e)
        console.log("======> [MessageService/sendTemplate] ERRO -> ", e.response.data)
        return e.response.data

    }
}



module.exports = { sendTextMessage, sendTemplate }