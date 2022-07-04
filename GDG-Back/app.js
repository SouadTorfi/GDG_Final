require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var createError = require("http-errors");
var cors = require("cors");

var adminRouter = require("./routes/admin");
var userRouter = require("./routes/user");
var categoryRouter = require("./routes/category");
var collectionRouter = require("./routes/collection");
var currencyRouter = require("./routes/currency");
var orderRouter = require("./routes/order");
var orderStatusRouter = require("./routes/orderStatus");
var productRouter = require("./routes/product");
var videoRouter = require("./routes/video");
var aboutRouter = require("./routes/about");

const { default: mongoose } = require("mongoose");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors()); // allows cross domain requests
// app.use(favicon(path.join(__dirname, '../public', 'favicon.ico'))) // <-- location of favicon

// Database Connection
mongoose
  .connect(process.env.URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected Successfully to Database");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/admins", adminRouter);
app.use("/api/abouts", aboutRouter);
app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/collections", collectionRouter);
app.use("/api/currencies", currencyRouter);
app.use("/api/orders", orderRouter);
app.use("/api/orderStatuses", orderStatusRouter);
app.use("/api/products", productRouter);
app.use("/api/video", videoRouter);

module.exports = app;
