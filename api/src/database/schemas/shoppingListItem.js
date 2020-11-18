import mongoose from "mongoose";
const Schema = mongoose.Schema;

const shoppinglistitem = new Schema({
  qty: Number,
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});
export { shoppinglistitem };
export default mongoose.model("shoppinglistitem", shoppinglistitem);
