const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const { option } = require("./middleware/session/index");
const { logHTTP } = require("./middleware/logger/index");
const config = require("./config/config");
require("dotenv").config();

//logging
app.use(logHTTP);
// app.use(cors(corsOptions));
const corsOptions = {
  credentials: true, // This is important.
  origin: config.allowedOrigin,
};

app.use(cors(corsOptions));
//db connections ::
require("./db-connect/index");

//session

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session(option));

//routing

app.use("/", require("./routes/route/index"));

app.listen(8000, () => console.log("app is listening to 8000"));
