import mongoose from "mongoose";
import { product } from "./product.js";
const Schema = mongoose.Schema;

const shoppinglistitem = new mongoose.Schema({
  qty: Number,
  product: product,
});
export { shoppinglistitem };
export default mongoose.model("shoppinglistitem", shoppinglistitem);
