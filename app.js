/* 
  Next steps:
  * Adding players to groups
  * Authorization
*/

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// Passport and Authentication
const passport = require("passport");
const config = require("./config");

// Mongo Stuff
const mongoose = require("mongoose");

// Photos
// article: https://medium.com/@alvenw/how-to-store-images-to-mongodb-with-node-js-fb3905c37e6d
const multer = require("multer");

// Routes:
const vanillaRouter = require("./routes/vanillaRouter");
const groupRouter = require("./routes/groupRouter");
const playersRouter = require("./routes/playersRouter");
const uploadRouter = require("./routes/uploadRouter");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const url = config.mongoUrl;
const connect = mongoose.connect(url, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connect.then(
  () => console.log("Connected correctly to server"),
  (err) => console.log(err)
);

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(passport.initialize());

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use("/vanilla", vanillaRouter);
app.use("/groups", groupRouter);
app.use("/players", playersRouter);
app.use("/imageUpload", uploadRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
