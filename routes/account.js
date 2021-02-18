const express = require("express");

const router = express.Router();
const accountController = require("../controllers/accountController");
const isAuth = require("../util/auth");

router.post("/register", accountController.register);

router.post("/login", accountController.login);

// router.post("/dashboard", isAuth, accountController.login);

module.exports = { router: router };
