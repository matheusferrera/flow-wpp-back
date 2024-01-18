const messageRepository = require("../Repositories/message.repository.js");


async function sendMessage(objMessage) {
    return await messageRepository.sendTextMessage(objMessage.message, objMessage.targetPhone);
}

async function sendTemplate(objMessage) {
    return await messageRepository.sendTemplate(objMessage.idTemplate, objMessage.targetPhone);
}



module.exports = { sendMessage, sendTemplate }