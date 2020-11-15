import mongoose from "mongoose";
import { shoppinglistitem } from "./shoppingListItem.js";
import { user } from "./user.js";
import { statusList, singleStatus } from "./status.js";

export const shoppinglistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: singleStatus,
  },
  statusList: statusList,
  items: {
    type: [shoppinglistitem],
    required: false,
  },
  createdBy: {
    type: user,
    required: true,
  },
});

export default mongoose.model("shoppinglist", shoppinglistSchema);
