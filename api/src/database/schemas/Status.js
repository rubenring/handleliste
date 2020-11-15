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
  statuslist: [singleStatus],
});

export default mongoose.model("status", statusList);
