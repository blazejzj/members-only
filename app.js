require("dotenv").config();
const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const authRouter = require("./routes/authRouter");
const messageRouter = require("./routes/messageRouter");

const app = express();

require("./config/passportConfig")(passport);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            maxAge: 1000 * 60 * 60,
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

app.use("/", authRouter);
app.use("/new-message", messageRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server now listens on port ${PORT}`);
});
