const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.email, // TODO: your gmail account
    pass: process.env.password, // TODO: your gmail password
  },
});

const mailOptions = (url, user) => {
  return {
    from: process.env.email,
    to: user.email,
    subject: "Password Recovery Mail NB:",
    text: `Click The Link To Change Password  ${url}`,
  };
};

const mailSent = (data, req, res) =>
  transporter.sendMail(data, (err, data) => {
    err
      ? res.json({ mailSentStatus: false, message: "some error occured" })
      : res.json({ mailSentStatus: true, message: "Please Check Your Mail" });
  });

module.exports = { transporter, mailOptions, mailSent };
