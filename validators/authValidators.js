const { body } = require("express-validator");

const alphaErr = "must only contain letters";
const usernameErr = "must only contain letters / numbers";
const nameLenghErr = "must be between 2 and 55 letters";
const passwordLengthErr = "must be minimum 8 characters long";
const passwordDontMatchError = "password must match!";

exports.verifyNewUser = [
    body("firstname")
        .trim()
        .isAlpha()
        .withMessage(alphaErr)
        .isLength({ min: 2, max: 55 })
        .withMessage(nameLenghErr),
    body("lastname")
        .trim()
        .isAlpha()
        .withMessage(alphaErr)
        .isLength({ min: 2, max: 55 })
        .withMessage(nameLenghErr),
    body("username")
        .trim()
        .matches(/^[A-Za-z1-9\s]+$/)
        .withMessage(usernameErr)
        .isLength({ min: 2, max: 55 })
        .withMessage(nameLenghErr),
    body("password").isLength({ min: 8 }).withMessage(passwordLengthErr),
    body("confirmPassword")
        .isLength({ min: 8 })
        .withMessage(passwordLengthErr)
        .custom((value, { req }) => value === req.body.password)
        .withMessage(passwordDontMatchError),
];

exports.validateLoginInput = [
    body("username")
        .trim()
        .matches(/^[A-Za-z1-9\s]+$/)
        .withMessage(usernameErr)
        .isLength({ min: 2, max: 55 })
        .withMessage(nameLenghErr),
    body("password").isLength({ min: 8 }).withMessage(passwordLengthErr),
];
