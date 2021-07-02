const { createLogger, format, transports } = require("winston");
const path = require("path");
const { combine, timestamp, errors, json, label, printf } = format;

const logger = createLogger({
  format: combine(timestamp(), json()),

  //transport is used to provide the location ,name and level of logfile.
  transports: [
    new transports.File({
      filename: path.join(__dirname, "../../log/http-req/req.log"),
      level: "http",
    }),
  ],
});

const logHTTP = (req, res, next) => {
  logger.log("http", { url: req.originalUrl, method: req.method, ip: req.ip });
  next();
};

module.exports = { logger, logHTTP };
