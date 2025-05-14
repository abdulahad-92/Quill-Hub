const UserModel = require("../models/users.js");
const jwt = require("jsonwebtoken");

const maxAge = 24 * 3 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: maxAge,
  });
};

const handleErr = (err) => {
  let errObj = { username: "", email: "", password: "" };

  if (err.message === "Incorrect Email") {
    errObj.email = "This Email is not registered";
  }
  if (err.message === "Incorrect Password") {
    errObj.password = "Enter a correct Password";
  }

  if (err.code === 11000) {
    if (err.keyValue.username)
      errObj.username = "Username is already registered";
    if (err.keyValue.email) errObj.email = "Email is already registered";
    return errObj;
  }
  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errObj[properties.path] = properties.path + " " + properties.type;
      console.log(properties);
    });
  }
  return errObj;
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const User = await UserModel.login(email, password);
    const token = createToken(User._id);
    res
      .cookie("jwt", token, {
        withCredentials: true,
        httpOnly: false,
        maxAge: maxAge * 1000,
        // secure: false,
        // sameSate: true,
        path: "/",
      })
      .cookie("id", User._id, {
        withCredentials: true,
        httpOnly: false,
        maxAge: maxAge * 1000,
        // secure: false,
        // sameSate: true,
        path: "/",
      })
      .cookie("username", User.username, {
        withCredentials: true,
        httpOnly: false,
        maxAge: maxAge * 1000,
        // secure: false,
        // sameSate: true,
        path: "/",
      })
      .json({ User: User._id, created: true });
    console.log(User._id);
  } catch (err) {
    console.log(err);
    const errs = handleErr(err);
    res.json({ errs, created: false });
  }
};
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);
    const User = await UserModel.create({
      username: username,
      email: email,
      password: password,
    });
    const token = createToken(User._id);

    res
      .cookie("jwt", token, {
        withCredentials: true,
        httpOnly: false,
        maxAge: maxAge * 1000,
        // secure: false,
        // sameSate: true,
        path: "/",
      })
      .cookie("id", User._id, {
        withCredentials: true,
        httpOnly: false,
        maxAge: maxAge * 1000,
        // secure: false,
        // sameSate: true,
        path: "/",
      })
      .cookie("username", User.username, {
        withCredentials: true,
        httpOnly: false,
        maxAge: maxAge * 1000,
        // secure: false,
        // sameSate: true,
        path: "/",
      })
      .json({ User: User._id, created: true });
  } catch (err) {
    console.log(err);
    const errs = handleErr(err);
    res.json({ errs, created: false });
  }
};
