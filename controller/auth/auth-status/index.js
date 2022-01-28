const authStatus = (req, res) => {
  req.session.user
    ? res.json({ auth: true, user: req.session.user.name })
    : res.json({ auth: false, user: "" });
};

const publicAuth = (req, res) => {
  req.session.user
    ? res.json({
        status: true,
        user: {
          _id: req.session.user.id,
          username: req.session.user.name,
          auth: true,
        },
      })
    : res.json({
        status: false,
        message: "Not Logged In",
      });
};

const logout = (req, res) => {
  req.session.destroy();
  res.json({ status: true, message: "logged out successfully" });
};

module.exports = { authStatus, logout, publicAuth };
