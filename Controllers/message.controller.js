const messageService = require("../Services/message.service.js");


async function sendMessage(req, res) {
    try {
        const data = await messageService.sendMessage(req.body);
        res.send(data);
    } catch(err) {
        res.send(err);
    }
}


async function sendTemplate(req, res) {
    try {
        const data = await messageService.sendTemplate(req.body);
        res.send(data);
    } catch(err) {
        res.send(err);
    }
}


module.exports = { sendMessage, sendTemplate }