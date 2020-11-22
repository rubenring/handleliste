import express from "express";
import jwt from "jsonwebtoken";
import moment from "moment";
import {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
} from "../../middlewares/verifySignup.js";
import {
  generateRefreshToken,
  genereateJwtToken,
  getRefreshToken,
} from "../../services/authService.js";
import { compareEnctypted } from "../../utils/tokenUtils.js";
import {
  createUserAndAddRoles,
  findRoleById,
  findSingleUser,
} from "../../services/userService.js";
import { AuthenticationError } from "../../Errors/CustomError.js";

const router = express.Router();

router.post(
  "/signup",
  [checkDuplicateUsernameOrEmail, checkRolesExisted],
  async (req, res) => {
    try {
      const { username, email, password, roles } = req.body;
      const user = await createUserAndAddRoles(
        username,
        email,
        password,
        roles
      );
      res.json(user);
    } catch (e) {
      res.status(e.status || 500).json({ msg: e.message });
    }
  }
);

router.post("/signin", async (req, res) => {
  try {
    const ipAddress = req.ip;
    const { username, password } = req.body;
    const user = await findSingleUser({
      username: username,
    });
    user.populate("roles", "-__v");

    const passwordIsValid = await compareEnctypted(password, user.password);
    if (!passwordIsValid) {
      throw new AuthenticationError("Invalid Password!");
    }
    //TODO: Check user._id
    var token = genereateJwtToken(user._id);
    const { exp } = jwt.decode(token);

    var authorities = [];
    for (let i = 0; i < user.roles.length; i++) {
      const role = await findRoleById(user.roles[i]._id);
      authorities.push("ROLE_" + role.name.toUpperCase());
    }

    const refreshtoken = await generateRefreshToken(user._id, ipAddress);
    res.json({
      roles: authorities,
      accessToken: token,
      refreshToken: refreshtoken.token,
      expires: exp,
    });
  } catch (e) {
    return res.status(e.status || 500).json({ msg: e.message });
  }
});
router.post("/token", async (req, res) => {
  const ipAddress = req.ip;
  const { username, refreshToken } = req.body;
  try {
    const user = await findSingleUser({
      username: username,
    });
    user.populate("roles", "-__v");

    const oldRefreshToken = await getRefreshToken(refreshToken);
    const newRefreshToken = await generateRefreshToken(user._id, ipAddress);
    oldRefreshToken.revoked = moment().utc();
    oldRefreshToken.replacedByToken = newRefreshToken.token;
    await oldRefreshToken.save();
    var token = genereateJwtToken(user._id);

    var authorities = [];
    for (let i = 0; i < user.roles.length; i++) {
      const role = await findRoleById(user.roles[i]._id);
      authorities.push("ROLE_" + role.name.toUpperCase());
    }

    res.json({ token, roles: authorities });
  } catch (e) {
    res.status(e.status || 500).json({ msg: e.message });
  }
});
router.post("/token/reject", function (req, res) {
  try {
    var { refreshToken } = req.body;
    if (refreshToken in refreshTokens) {
      delete refreshTokens[refreshToken];
    }
    res.sendStatus(204);
  } catch (e) {
    res.status(e.status || 500).json({ msg: e.message });
  }
});

router.post("/signout", function (req, res) {
  try {
    res.sendStatus(501);
  } catch (e) {
    res.status(e.status || 500).json({ msg: e.message });
  }
});
export default router;
