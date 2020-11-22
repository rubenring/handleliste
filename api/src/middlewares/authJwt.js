import jwt from "jsonwebtoken";
import config from "../../configurations/auth.config";
import User from "../database/schemas/User.js";
import Role from "../database/schemas/Role.js";
import { NotAuthenticated, NotAuthorized } from "../Errors/CustomError";

const verifyToken = (req, res, next) => {
  try {
    let token = req.headers["x-access-token"];
    if (!token) {
      throw new NotAuthorized("No token provided!");
    }

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        throw new NotAuthenticated("Unauthorized!");
      }

      req.user = {
        id: decoded.id,
        exp: decoded.exp,
      };
      next();
    });
  } catch (e) {
    res.json({ msg: e.message });
  }
};

const isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }
        throw new NotAuthorized("Require Admin Role!");
      }
    );
  });
};

const isModerator = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Moderator Role!" });
        return;
      }
    );
  });
};

export { isModerator, isAdmin, verifyToken };
