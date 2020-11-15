import mongoose from "mongoose";
import { shoppinglistitem } from "./shoppingListItem.js";
import { User } from "./User.js";
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
    type: User,
    required: true,
  },
});

export default mongoose.model("shoppinglist", shoppinglistSchema);
