const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { authenticationToken } = require("../utilities");

router.post("/create-account", userController.createAccount);
router.post("/login", userController.login);
router.get("/get-user", authenticationToken, userController.getUser);

module.exports = router;
