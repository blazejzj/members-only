const { Router } = require("express");
const authController = require("../controllers/authController");

const authRouter = Router();

authRouter.get("/sign-up", authController.signUpGet);
authRouter.post("/sign-up", authController.signUpPost);

authRouter.get("/log-in", authController.loginGet);
authRouter.post("/log-in", authController.loginPost);

authRouter.get("/log-out", authController.logout);

authRouter.get("/", (req, res) => {
    res.render("index");
});

module.exports = authRouter;
