const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const { option } = require("./middleware/session/index");
const { logger, logHTTP } = require("./middleware/logger/index");
require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("useUnifiedTopology", true);
console.log("request received first time");
//logging
app.use(logHTTP);
// app.use(cors(corsOptions));
const corsOptions = {
  credentials: true, // This is important.
  origin: [
    "http://localhost:8080",
    "http://localhost:8000",
    "http://localhost",
    "http://3.17.55.187:8000",
    "https://newsbird.live",
  ],
};

app.use(cors(corsOptions));

//db connections
mongoose
  .connect(process.env.mongodbLocal, { useNewUrlParser: true })
  .then(() => {
    console.log("Your are connected to database");
  })
  .catch((err) => console.log(err));

var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//session

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session(option));

//routing

app.use("/", require("./routes/route/index"));

app.listen(8000, () => console.log("app is listening to 8000"));
