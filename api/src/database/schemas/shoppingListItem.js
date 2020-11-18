import mongoose from "mongoose";
import moment from "moment";
const Schema = mongoose.Schema;

const shoppinglistitem = new Schema({
  qty: Number,
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: moment().utc() },
});
export { shoppinglistitem };
export default mongoose.model("shoppinglistitem", shoppinglistitem);
