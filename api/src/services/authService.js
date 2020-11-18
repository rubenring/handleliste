import authConfig from "../../configurations/auth.config.js";
import RefreshToken from "../database/schemas/refreshToken.js";
import randtoken from "rand-token";
import moment from "moment";
import jwt from "jsonwebtoken";

export const getRefreshToken = async (token) => {
  const rfToken = await RefreshToken.findOne({
    token,
  }).populate("user");
  if (!rfToken || !rfToken.isActive) throw new Error("Invalid token");
  return rfToken;
};

export const generateRefreshToken = async (user, ipAddress) => {
  const randomToken = generateRandomTokenString();

  return new RefreshToken({
    user: user.id,
    token: randomToken,
    createdByIp: ipAddress,
    expires: moment().utc().add(30, "s"),
  });
};

export const genereateJwtToken = (user) => {
  // create a jwt token containing the user id that expires in 15 minutes
  return jwt.sign({ sub: user.id, id: user.id }, authConfig.secret, {
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

export const generateRandomTokenString = () => randtoken.uid(256);
