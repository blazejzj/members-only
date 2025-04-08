require("dotenv").config();
const db = require("../db/queries");

exports.applyMembershipPost = async (req, res) => {
    const guessedPassword = req.body.memberPassword;
    const userIdToUpdate = req.user.id;

    if (guessedPassword === process.env.MEMBERSHIP_PASSWORD) {
        await db.updateUserToMember(userIdToUpdate);
        return res.redirect("/");
    }
    let messages = [];
    if (req.user.membership === 1) {
        messages = await db.getAllMessages();
    } else {
        messages = await db.getAllMessagesLessInfo();
    }

    return res.status(400).render("index", {
        error: ["Wrong password! Not upgraded!"],
        messages,
    });
};
