const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
// const corsOptions = require("./middleware/cors/index");
const { logger, logHTTP } = require("./middleware/logger/index");
require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("useUnifiedTopology", true);

//logging
app.use(logHTTP);
// app.use(cors(corsOptions));
const corsOptions = {
  credentials: true, // This is important.
  origin: ["http://localhost:8080"],
};

app.use(cors(corsOptions));

//db connections
mongoose.connect(process.env.mongodb, { useNewUrlParser: true }).then(() => {
  console.log("Your are connected to database");
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//session
const session = require("./middleware/session");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session);

//routing

app.use("/", require("./routes/route/index"));

app.listen(process.env.port, () => console.log("app is listening to 8000"));
