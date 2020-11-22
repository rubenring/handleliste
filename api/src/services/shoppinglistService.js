import Shoppinglists from "../database/schemas/shoppinglist.js";
import { BadRequest, NotFound } from "../Errors/CustomError.js";
import { createSingleStatus, createStatusList } from "./statusService.js";
import moment from "moment";

export const findShoppinglistById = async (id) => {
  const shoppinglist = await Shoppinglists.findById(id)
    .populate({
      path: "createdBy",
      select: ["-password"],
      populate: {
        path: "roles",
      },
    })
    .populate({
      path: "updatedBy",
      select: ["-password"],
      populate: {
        path: "roles",
      },
    })
    .populate("status")
    .populate({
      path: "items",
      populate: {
        path: "product",
      },
    })
    .populate({
      path: "statusList",
      populate: {
        path: "items",
      },
    });

  if (!shoppinglist) {
    throw new NotFound(`no shoppinglist with id ${id}`);
  } else {
    return shoppinglist;
  }
};

export const findShoppinglists = async () =>
  Shoppinglists.find()
    .populate({
      path: "items",
      populate: {
        path: "product",
      },
    })
    .populate({
      path: "createdBy",
      select: ["-password"],
      populate: {
        path: "roles",
      },
    })
    .populate({
      path: "updatedBy",
      select: ["-password"],
      populate: {
        path: "roles",
      },
    })
    .populate("status")
    .populate({
      path: "statusList",
      populate: {
        path: "items",
      },
    });
export const checkIfShoppinglistExists = async (filter) => {
  return Shoppinglists.exists(filter);
};
export const throwIfShoppinglistNotExists = async (filter) => {
  const excists = await checkIfShoppinglistExists(filter);
  if (!excists) {
    throw new BadRequest(
      `Shoppinglist with searchfilter ${JSON.stringify(
        filter
      )} does not excists`
    );
  }
};
export const throwIfShoppinglistExists = async (filter) => {
  const excists = await checkIfShoppinglistExists(filter);
  if (excists) {
    throw new BadRequest(
      `Shoppinglist with searchfilter ${JSON.stringify(filter)} excists`
    );
  }
};

export const createShoppingList = async (
  name,
  items,
  createdById,
  updatedById,
  lastUpdated
) => {
  const singleStatus = await createSingleStatus("Active", moment().utc());
  const statusList = await createStatusList(moment().utc(), [singleStatus._id]);
  const shoppinglist = new Shoppinglists({
    name: name,
    items: items,
    status: singleStatus._id,
    statusList: statusList._id,
    createdBy: createdById,
    updatedBy: updatedById,
    lastUpdated: lastUpdated,
  });
  const saved = await shoppinglist.save();

  return findShoppinglistById(saved._id);
};

export const updateShoppinglist = async (name, id) => {
  console.log(id);
  await throwIfShoppinglistNotExists({ name: name });

  if (!id) throw BadRequest("param id not defined");
  if (!name) throw BadRequest("body param name not defined");

  const filter = { _id: id };
  const update = {
    name: name,
    lastUpdated: moment().utc(),
  };
  const updated = await Shoppinglists.updateOne(filter, update);
  return findShoppinglistById(id);
};

export const deleteShoppinglistByFilter = async (filter) => {
  const status = await Shoppinglists.deleteOne(filter);
  if (status.deletedCount === 0) throw new NotFound("no items deleted");
};
