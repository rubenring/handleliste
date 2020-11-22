import User from "../database/schemas/User.js";
import Role from "../database/schemas/Role.js";

import { BadRequest, DatabaseError, NotFound } from "../Errors/CustomError.js";
import { enctyptString } from "../utils/tokenUtils.js";

export const createUser = async (username, email, password) => {
  try {
    const user = new User({
      username: username,
      email: email,
      password: enctyptString(password),
    });
    await user.save();
    return User.findById(user._id);
  } catch (e) {
    throw new DatabaseError(e.message);
  }
};
export const createUserAndAddRoles = async (
  username,
  email,
  password,
  roles
) => {
  const user = createUser(username, email, password);
  if (roles) {
    return addRolesToUser(user, roles);
  } else {
    return addUserRoleToUser(user);
  }
};
const addUserRoleToUser = async (user) => {
  const userRole = await Role.findOne({ name: "user" });
  if (!userRole) {
    throw new DatabaseError("Could not find user role in db");
  }
  user.roles = [userRole._id];
  try {
    await user.save();
    return User.findById(user._id).populate("roles");
  } catch (e) {
    throw new DatabaseError(e.message);
  }
};

const addRolesToUser = async (user, roles) => {
  if (!roles || roles.length === 0) {
    throw new BadRequest("No roles in request body");
  }
  const foundRoles = await Role.find({ name: { $in: roles } });
  if (!foundRoles || foundRoles.length === 0) {
    throw new BadRequest("No roles found matching the input");
  }
  user.roles = foundRoles.map((role) => role._id);
  try {
    await user.save();
    return User.findById(user._id).populate("roles");
  } catch (e) {
    throw new DatabaseError(e.message);
  }
};

export const findSingleUser = async (filter) => {
  try {
    const user = await User.findOne(filter);
    if (!user) {
      throw new NotFound(`no user with ${JSON.stringify(filter)} exists`);
    }
    return user;
  } catch (e) {
    throw new DatabaseError(e.message);
  }
};

export const findUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new NotFound(`no user with id ${id} exists`);
  }
  return user;
};

export const findRoleById = async (id) => {
  const user = await Role.findById(id);
  if (!user) {
    throw new NotFound(`no role with id ${id} exists`);
  }
  return user;
};
export const findRole = async (filter) => {
  try {
    const user = await Role.findOne(filter);
    if (!user) {
      throw new NotFound(`no role with ${JSON.stringify(filter)} exists`);
    }
    return user;
  } catch (e) {
    throw new DatabaseError(e.message);
  }
};
