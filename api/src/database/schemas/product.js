import mongoose from "mongoose";
const Schema = mongoose.Schema;

const product = new Schema({
  name: String,
  price: Number,
});
export { product };
export default mongoose.model("Product", product);
