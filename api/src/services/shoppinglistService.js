import Shoppinglists from "../database/schemas/shoppinglist.js";

export const findShoppinglistById = async (id) =>
  Shoppinglists.findById(id)
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
  const excists = checkIfShoppinglistExists(filter);
  if (!excists) {
    throw new Error(
      `Shoppinglist with searchfilter ${JSON.stringify(filter)} already excists`
    );
  }
};
export const throwIfShoppinglistExists = async (filter) => {
  const excists = checkIfShoppinglistExists(filter);
  if (excists) {
    throw new Error(
      `Shoppinglist with searchfilter ${JSON.stringify(
        filter
      )} does not excists`
    );
  }
};

export const createShoppingList = async (
  name,
  items,
  statusId,
  statusListId,
  createdById,
  updatedById,
  lastUpdated
) => {
  new Shoppinglists({
    name: name,
    items: items,
    status: statusId,
    statusList: statusListId,
    createdBy: createdById,
    updatedBy: updatedById,
    lastUpdated: lastUpdated,
  });

  return shoppinglist.save();
};

export const updateShoppinglist = async (filter, update) => {
  const updated = await Shoppinglists.updateOne(filter, update);
  return findShoppinglistById(updated.id);
};

export const deleteShoppinglistByFilter = async (filter) => {
  const status = await Shoppinglists.deleteOne(filter);
  if (status.deletedCount === 0) throw new Error("no items deleted");
};
