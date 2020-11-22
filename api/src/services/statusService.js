import StatusList, {
  SingelStatusModel,
  statusList,
} from "../database/schemas/status.js";
import { BadRequest, DatabaseError, NotFound } from "../Errors/CustomError.js";
import moongoose from "mongoose";

export const createSingleStatus = async (name, createdAt) => {
  const singleStatus = new SingelStatusModel({
    _id: new moongoose.Types.ObjectId(),
    name: name,
    createdAt: createdAt,
  });
  return singleStatus.save();
};

export const createStatusList = async (updatedAt, items) => {
  try {
    if (!items) {
      throw BadRequest("no items");
    }
    const statusList = new StatusList({
      _id: new moongoose.Types.ObjectId(),
      updatedAt: updatedAt,
      items: items,
    });
    return statusList.save();
  } catch (e) {
    throw new DatabaseError(e.message);
  }
};

export const findStatusListById = async (id) => {
  const statuslist = StatusList.findById(id);
  if (!statusList) throw NotFound(`Cant find statuslist with id ${id}`);
  return statuslist;
};
