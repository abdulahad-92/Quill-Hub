const express = require("express");
const Router = express.Router();
const { checkUser } = require("../middlewares/auth.js");
const userController = require("../controllers/user.js");

Router.post("/", checkUser);
Router.post("/login", userController.login);
Router.post("/register", userController.register);

module.exports = Router;
