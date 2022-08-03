const config = require("config");
const { getParams, platformEndPoint } = require("../../services/sns/index");

const registerToken = async (req, res) => {
  const data = await platformEndPoint(getParams(req.query.deviceToken));
  console.log("res from platemendPoint", data);
  res.json({ success: true, message: data });
};

module.exports = { registerToken };
