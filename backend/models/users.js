const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          // Simple email validation using a regular expression
          return /^\S+@\S+\.\S+$/.test(value);
        },
        message: "Invalid email address",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      required: true,
      minlength: 8,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const User = await this.findOne({ email });
  if (User) {
    const auth = await bcrypt.compare(password, User.password);
    if (auth) {
      return User;
    }
    throw Error("Incorrect Password");
  } else {
    throw Error("Incorrect Email");
  }
};
const UserModel = mongoose.model("Users", userSchema);

module.exports = UserModel;
