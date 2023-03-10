var createError = require("http-errors");
var express = require("express");
const cors = require('cors');
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// connect monggose database
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://codemongo:suksesmongo23@cluster0.yamvufb.mongodb.net/db_perpus?retryWrites=true&w=majority"
);
// method override
const methodOverride = require("method-override");
// lib express-session
const session = require("express-session");
// lib flash
const flash = require("connect-flash");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
// route admin
const adminRouter = require("./routes/admin");
const apiRouter = require("./routes/api");

var app = express();

// view engine setup
app.use(cors());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 160000 },
  })
);
app.use(flash());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use(
  "/sb-admin2",
  express.static(path.join(__dirname, "node_modules/startbootstrap-sb-admin-2"))
);
app.use("/admin", adminRouter);
app.use("/api/v1", apiRouter);
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
