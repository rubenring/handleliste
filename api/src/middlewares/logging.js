import logger from "../logging/config.js";

const log = (err, req, res, next) => {
  logger.error(
    `${req.method} - ${err.message}  - ${req.originalUrl} - ${req.ip}`
  );
  next();
};
export default log;
