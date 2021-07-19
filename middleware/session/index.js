require("dotenv").config();
const MongoStore = require("connect-mongo");

const option = {
  store: MongoStore.create({
    mongoUrl: process.env.mongodbLocal,
  }),
  resave: false,
  name: "sessionId",
  saveUninitialized: false,
  secret: "secret",
  cookie: { path: "/", httpOnly: false, secure: false, maxAge: 1200000 },
};

module.exports = { option };
