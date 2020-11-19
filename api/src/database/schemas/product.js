import mongoose from "mongoose";
const Schema = mongoose.Schema;

const product = new Schema({
  name: String,
  price: Number,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: { type: Date, default: moment().utc() },
});
export { product };
export default mongoose.model("Product", product);
