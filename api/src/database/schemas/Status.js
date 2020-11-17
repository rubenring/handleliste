import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const singleStatus = new Schema({
  name: {
    type: String,
    enum: ["Active", "Inactive"],
  },
  createdAt: Date,
});
export const statusList = new Schema({
  updatedAt: Date,
  items: [{ type: Schema.Types.ObjectId, ref: "SingleStatusModel" }],
});

export const SingelStatusModel = mongoose.model(
  "SingleStatusModel",
  singleStatus
);
export default mongoose.model("status", statusList);
