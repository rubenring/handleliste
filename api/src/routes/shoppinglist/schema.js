import mongoose from "mongoose";
import ShoppinglistStatus from "../../database/schemas/Status";
import Products from "../products/schema";

const schema = mongoose.Schema({
  id: String,
  name: String,
  status: [ShoppinglistStatus | null],
  products: [Products | null],
});

export default mongoose.model("shoppinglist", schema);
