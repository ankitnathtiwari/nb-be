const Auth = (req, res, next) => {
  req.session.user ? next() : res.json({ message: "please login first" });
};
