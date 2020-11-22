import authConfig from "../../configurations/auth.config.js";
import RefreshToken from "../database/schemas/refreshToken.js";
import moment from "moment";
import jwt from "jsonwebtoken";
import { BadRequest } from "../Errors/CustomError.js";
import { generateRandomTokenString } from "../utils/tokenUtils.js";

export const getRefreshToken = async (token) => {
  const rfToken = await RefreshToken.findOne({
    token,
  }).populate("user");
  if (!rfToken || !rfToken.isActive) throw new BadRequest("Invalid token");
  return rfToken;
};

export const generateRefreshToken = async (userId, ipAddress) => {
  const randomToken = generateRandomTokenString();

  const refreshToken = new RefreshToken({
    user: userId,
    token: randomToken,
    createdByIp: ipAddress,
    expires: moment().utc().add(30, "m"),
  });
  const savedToken = await refreshToken.save();
  return getRefreshToken(savedToken.token);
};

export const genereateJwtToken = (signString) => {
  // create a jwt token containing the user id that expires in 15 minutes
  return jwt.sign({ sub: signString, id: signString }, authConfig.secret, {
    expiresIn: "15m",
  });
};

export const revokeToken = async ({ token, ipAddress }) => {
  const refreshToken = await getRefreshToken(token);

  // revoke token and save
  refreshToken.revoked = moment().utc();
  refreshToken.revokedByIp = ipAddress;
  await refreshToken.save();
};
