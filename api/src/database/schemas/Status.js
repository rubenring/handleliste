import mongoose from "mongoose";

const schema = mongoose.Schema({
  name: {
    type: String,
    enum: ["Active", "Inactive"],
  },
  createdAt: Date,
});

export default mongoose.model("ShoppinglistStatus", schema);
