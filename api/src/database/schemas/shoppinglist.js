import mongoose from "mongoose";
import moment from "moment";
const Schema = mongoose.Schema;

export const shoppinglistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  status: { type: Schema.Types.ObjectId, ref: "SingleStatusModel" },
  statusList: { type: Schema.Types.ObjectId, ref: "status" },
  items: {
    type: [{ type: Schema.Types.ObjectId, ref: "shoppinglistitem" }],
    required: false,
  },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: moment().utc() },
  lastUpdated: { type: Date, default: moment().utc() },
});

export default mongoose.model("shoppinglist", shoppinglistSchema);
