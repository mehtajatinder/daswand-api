const express = require("express");

const dashboardController = require("../controllers/dashboardController");
const isAuth = require("../util/auth");

const router = express.Router();

router.get("/dashboard", isAuth, dashboardController.getDashboardData);

module.exports = { router: router };
