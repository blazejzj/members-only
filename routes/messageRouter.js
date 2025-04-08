const { Router } = require("express");
const messageController = require("../controllers/messageController");
const messageRouter = Router();

messageRouter.post("/new-message", messageController.newMessagePost);
messageRouter.post("/delete-message/:id", messageController.deleteMessageById);

module.exports = messageRouter;
