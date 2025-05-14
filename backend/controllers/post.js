const postModel = require("../models/post.js");

const handleErr = (err) => {
  let errObj = { title: "", summary: "", author: "" };

  //   if (err.message === "Incorrect Email") {
  //     errObj.email = "This Email is not registered";
  //   }
  //   if (err.message === "Incorrect Password") {
  //     errObj.password = "Enter a correct Password";
  //   }
  //   if (err.code === 11000) {
  //     if (err.keyValue.username)
  //       errObj.username = "Username is already registered";
  //     if (err.keyValue.email) errObj.email = "Email is already registered";
  //     return errObj;
  //   }
  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errObj[properties.path] = properties.path + " " + properties.type;
      console.log(properties);
    });
  }
  return errObj;
};
exports.create = async (req, res) => {
  try {
    const { title, summary, author, content, user } = req.body;
    const newPost = await postModel.create({
      title,
      summary,
      author,
      content,
      img: req.file.filename,
      user,
    });
    res.json({ data: newPost });
    console.log(newPost);
  } catch (err) {
    console.log(err);
    const errs = handleErr(err);
    res.json({ errs, created: false });
  }
};
exports.getAll = async (req, res) => {
  try {
    const posts = await postModel.find().sort({ createdAt: -1 });
    res.json({ data: posts });
    // console.log(posts);
  } catch (err) {
    console.log(err);
    const errs = handleErr(err);
    res.json({ errs, created: false });
  }
};
exports.getOne = async (req, res) => {
  try {
    const post = await postModel.findOne({ _id: req.params.id });
    res.json({ data: post });
    // console.log(post);
  } catch (err) {
    console.log(err);
    const errs = handleErr(err);
    res.json({ errs, created: false });
  }
};
exports.edit = async (req, res) => {
  try {
    const { title, summary, author, content, user, date, photo } = req.body;
    const post = await postModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.json({ data: post });
    console.log(
      "Edit ------------------------------------------------------------------------------",
      req.body
    );
  } catch (err) {
    console.log(err);
    const errs = handleErr(err);
    res.json({ errs, created: false });
  }
};
exports.delete = async (req, res) => {
  try {
    const post = await postModel.findOneAndDelete({ _id: req.params.id });
    res.json({ data: post });
    console.log(post);
  } catch (err) {
    console.log(err);
    const errs = handleErr(err);
    res.json({ errs, created: false });
  }
};
