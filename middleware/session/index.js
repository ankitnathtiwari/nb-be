require("dotenv").config();
const MongoStore = require("connect-mongo");

const option = {
  store: MongoStore.create({
    mongoUrl: process.env.mongodb,
  }),
  resave: false,
  name: "sessionId",
  saveUninitialized: false,
  secret: "secret",
  cookie: { path: "/", httpOnly: false, secure: false, maxAge: 604800000 },
};

module.exports = { option };
