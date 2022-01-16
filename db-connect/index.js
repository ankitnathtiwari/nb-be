const mongoose = require("mongoose");

mongoose.set("useUnifiedTopology", true);
mongoose.connect(process.env.mongodb, { useNewUrlParser: true }).then(() => {
  console.log("Your are connected to database");
}).catch(err=>console.log(err));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

module.exports = db;
