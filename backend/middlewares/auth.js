const jwt = require("jsonwebtoken");
const UserModel = require("../models/users.js");

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
      if (err) {
        res.json({ status: false });
        next();
      } else {
        const user = await UserModel.findById(decodedToken.id);
        console.log(user);
        if (user) res.json({ status: true, user: user.username });
        else {
          res.json({ status: false });
          next();
        }
      }
    });
  } else {
    res.json({ status: false });
    next();
  }
};
