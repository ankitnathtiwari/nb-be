const authStatus = (req, res) => {
  req.session.user
    ? res.json({ auth: true, user: req.session.user.name })
    : res.json({ auth: false, user: "" });
};

const logout = (req, res) => {
  req.session.destroy();
  res.json({ loggedOut: true, message: "logged out successfully" });
};

module.exports = { authStatus, logout };
