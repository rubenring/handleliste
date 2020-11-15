import config from "../../../configurations/auth.config.js";

export const isLoggedInnUser = (token) => {
  let token = req.headers["x-access-token"];

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
  });
};
