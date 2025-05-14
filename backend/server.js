const express = require("express");
const app = express();
const mongoose = require("mongoose");

const userRoutes = require("./routes/user.js");
const postRoutes = require("./routes/post.js");
const cors = require("cors");
const cookie = require("cookie-parser");
// dotenv
const dotenv = require("dotenv");
dotenv.config("");

const Port = process.env.PORT;

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    AccessControlAllowCredentials: true,
  })
);

app.use(cookie());
app.use(express.json());
app.use("/users", userRoutes);
app.use("/api", postRoutes);

// connecting db
mongoose
  .connect(process.env.URI, {})
  .then(() => {
    console.log("db connected");

    app.listen(Port, () => {
      console.log("server connected");
    });
  })
  .catch((err) => console.log(err));
