require("dotenv").config();
const MongoStore = require("connect-mongo");

const option = {
  store: MongoStore.create({
    mongoUrl:
      "mongodb+srv://ankitfounder:1234@cluster0.avlkx.mongodb.net/ankitdb?retryWrites=true&w=majority",
  }),
  resave: false,
  name: "sessionId",
  saveUninitialized: false,
  secret: "secret",
  cookie: { path: "/", httpOnly: false, secure: false, maxAge: 1200000 },
};

module.exports = { option };
