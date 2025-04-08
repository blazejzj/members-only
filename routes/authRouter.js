const { Router } = require("express");
const authController = require("../controllers/authController");
const db = require("../db/queries");
const authRouter = Router();

authRouter.get("/sign-up", authController.signUpGet);
authRouter.post("/sign-up", authController.signUpPost);

authRouter.get("/log-in", authController.loginGet);
authRouter.post("/log-in", authController.loginPost);

authRouter.get("/log-out", authController.logout);

authRouter.post("/make-admin", authController.makeAdminPost);

authRouter.get("/", async (req, res, next) => {
    try {
        let error = [];
        let messages = [];

        if (req.user && req.user.membership === 1) {
            messages = await db.getAllMessages();
        } else {
            messages = await db.getAllMessagesLessInfo();
        }

        res.render("index", { error: error, messages: messages });
    } catch (err) {
        next(err);
    }
});

module.exports = authRouter;
