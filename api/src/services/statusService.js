import StatusList, { SingelStatusModel } from "../database/schemas/status.js";

export const createSingleStatus = async (name, createdAt) => {
  const singleStatus = new SingelStatusModel({
    _id: new moongoose.Types.ObjectId(),
    name: name,
    createdAt: createdAt,
  });
  return singleStatus.save();
};

export const createStatusList = async (updatedAt, items) => {
  const statusList = new StatusList({
    _id: new moongoose.Types.ObjectId(),
    updatedAt: updatedAt,
    items: items,
  });
  return statusList.save();
};
