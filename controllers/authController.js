const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../db/queries");
const {
    verifyNewUser,
    validateLoginInput,
} = require("../validators/authValidators");
const passport = require("passport");

exports.signUpGet = (req, res) => {
    res.render("sign-up", { title: "Create user", errors: [] });
};

exports.signUpPost = [
    verifyNewUser,
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).render("sign-up", {
                    title: "Create user",
                    errors: errors.array(),
                });
            }

            const { firstname, lastname, username, password } = req.body;

            if (!(await db.userNameExists(username))) {
                const hashedPassword = await bcrypt.hash(password, 10);
                await db.addUser(firstname, lastname, username, hashedPassword);
                res.redirect("/");
            } else {
                return res.status(400).render("sign-up", {
                    title: "Create user",
                    errors: errors.array(),
                });
            }
        } catch (err) {
            next(err);
        }
    },
];

exports.loginGet = (req, res) => {
    res.render("log-in", { title: "Log in", errors: [] });
};

exports.loginPost = [
    validateLoginInput,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("log-in", {
                title: "Log in",
                errors: errors.array(),
            });
        }
        passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "/log-in",
        })(req, res, next);
    },
];

exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect("/");
    });
};

exports.makeAdminPost = async (req, res) => {
    if (req.body.beAdmin) {
        const userId = req.user.id;
        await db.makeUserAdminById(userId);
    }

    res.redirect("/");
};
