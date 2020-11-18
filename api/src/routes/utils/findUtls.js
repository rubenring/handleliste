import Shoppinglists from "../../database/schemas/shoppinglist.js";
import RefreshToken from "../../database/schemas/refreshToken.js";

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
