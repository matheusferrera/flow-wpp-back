const express = require("express");
const messageController = require("../Controllers/message.controller.js");

const app = express.Router();

app.post("/sendMessage", messageController.sendMessage);
app.post("/sendTemplate", messageController.sendTemplate);


module.exports = app;