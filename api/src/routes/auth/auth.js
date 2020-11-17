import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
} from "../../middlewares/verifySignup.js";
import authConfig from "../../../configurations/auth.config.js";
import User from "../../database/schemas/User.js";
import Role from "../../database/schemas/Role.js";
import logger from "../../middlewares/logging.js";

const router = express.Router();

router.post(
  "/signup",
  [checkDuplicateUsernameOrEmail, checkRolesExisted],
  async (req, res) => {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    user.save((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (req.body.roles) {
        Role.find(
          {
            name: { $in: req.body.roles },
          },
          (err, roles) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            user.roles = roles.map((role) => role._id);
            user.save((err) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }

              res.send({ message: "User was registered successfully!" });
            });
          }
        );
      } else {
        Role.findOne({ name: "user" }, (err, role) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = [role._id];
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        });
      }
    });
  }
);

router.post(
  "/signin",
  (req, res, next) => {
    console.log(req.hostname);
    next();
  },
  async (req, res) => {
    try {
      const user = await User.findOne({
        username: req.body.username,
      });
      console.log(user);

      user.populate("roles", "-__v");

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      console.log(user);

      const passwordIsValid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];
      for (let i = 0; i < user.roles.length; i++) {
        const role = await Role.findById(user.roles[i]._id).exec();
        authorities.push("ROLE_" + role.name.toUpperCase());
      }
      res.status(200).json({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
      });
    } catch (e) {
      return res.status(500).send({ message: e.message });
    }
  }
);
export default router;
