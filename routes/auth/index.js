const express = require("express");
const { login, googleLogin } = require("../../controller/auth/login");
const { register } = require("../../controller/auth/register");
const {
  authStatus,
  logout,
  publicAuth,
} = require("../../controller/auth/auth-status/index");
const {
  passwordChange,
  tokenVerification,
} = require("../../controller/auth/password-change/index");

const { passwordForgot } = require("../../controller/auth/password-forgot");

const router = express.Router();

router.get("/", authStatus);
router.get("/publicAuth", publicAuth);
router.post("/login", login);
router.get("/googleLogin", googleLogin);
router.post("/register", register);
router.post("/password_change", passwordChange);
router.post("/password_forgot", passwordForgot);
router.get("/reset", tokenVerification);
router.get("/logout", logout);

module.exports = router;
