const db = require("../db/queries");

exports.newMessagePost = async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send("You must be logged in");
    }

    const { title, text } = req.body;
    const username = req.user.username;
    await db.addNewMessage(title, text, username);
    res.render("index");
};
