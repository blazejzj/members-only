const { Router } = require("express");
const memberRouter = Router();
const memberController = require("../controllers/memberController");

memberRouter.post("/", memberController.applyMembershipPost);

module.exports = memberRouter;
