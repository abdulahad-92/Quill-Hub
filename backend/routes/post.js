const express = require("express");
const Router = express.Router();
const postController = require("../controllers/post.js");
const { upload } = require("../middlewares/upload.js");

Router.post("/create", upload.single("photo"), postController.create);
Router.get("/getAll", postController.getAll);
Router.get("/getOne/:id", postController.getOne);
Router.patch("/edit/:id", postController.edit);
Router.delete("/delete/:id", postController.delete);

module.exports = Router;
