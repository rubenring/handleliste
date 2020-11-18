import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
} from "../../middlewares/verifySignup.js";
import User from "../../database/schemas/User.js";
import Role from "../../database/schemas/Role.js";
import {
  generateRefreshToken,
  genereateJwtToken,
  getRefreshToken,
} from "../../services/authService.js";
import moment from "moment";

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
        res.status(500).json({ msg: err.message });
        return;
      }

      if (req.body.roles) {
        Role.find(
          {
            name: { $in: req.body.roles },
          },
          (err, roles) => {
            if (err) {
              res.status(500).json({ msg: err.message });
              return;
            }

            user.roles = roles.map((role) => role._id);
            user.save((err) => {
              if (err) {
                res.status(500).json({ msg: err.message });
                return;
              }

              res.json({ msg: "User was registered successfully!" });
            });
          }
        );
      } else {
        Role.findOne({ name: "user" }, (err, role) => {
          if (err) {
            res.status(500).json({ msg: err.message });
            return;
          }

          user.roles = [role._id];
          user.save((err) => {
            if (err) {
              res.status(500).json({ msg: err.message });
              return;
            }

            res.json({ msg: "User was registered successfully!" });
          });
        });
      }
    });
  }
);

router.post("/signin", async (req, res) => {
  try {
    const ipAddress = req.ip;
    const { username, password } = req.body;
    const user = await User.findOne({
      username: username,
    });
    user.populate("roles", "-__v");

    if (!user) {
      return res.status(404).json({ msg: "User Not found." });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({
        accessToken: null,
        msg: "Invalid Password!",
      });
    }
    //TODO: Check user._id
    var token = genereateJwtToken(user);
    const { exp } = jwt.decode(token);

    var authorities = [];
    for (let i = 0; i < user.roles.length; i++) {
      const role = await Role.findById(user.roles[i]._id).exec();
      authorities.push("ROLE_" + role.name.toUpperCase());
    }

    const refreshtoken = await generateRefreshToken(user, ipAddress);
    await refreshtoken.save();
    res.json({
      roles: authorities,
      accessToken: token,
      refreshToken: refreshtoken.token,
      expires: exp,
    });
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
});
router.post("/token", async (req, res) => {
  const ipAddress = req.ip;
  const { username, refreshToken } = req.body;
  try {
    const user = await User.findOne({
      username: username,
    });
    user.populate("roles", "-__v");
    if (!user) {
      return res.status(404).json({ msg: "User Not found." });
    }
    const oldRefreshToken = await getRefreshToken(refreshToken);
    const newRefreshToken = await generateRefreshToken(user, ipAddress);
    oldRefreshToken.revoked = moment().utc();
    oldRefreshToken.replacedByToken = newRefreshToken.token;
    await oldRefreshToken.save();
    await newRefreshToken.save();
    var token = genereateJwtToken(user);

    var authorities = [];
    for (let i = 0; i < user.roles.length; i++) {
      const role = await Role.findById(user.roles[i]._id).exec();
      authorities.push("ROLE_" + role.name.toUpperCase());
    }

    res.json({ token, roles: authorities });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});
router.post("/token/reject", function (req, res) {
  var { refreshToken } = req.body;
  if (refreshToken in refreshTokens) {
    delete refreshTokens[refreshToken];
  }
  res.sendStatus(204);
});
export default router;
