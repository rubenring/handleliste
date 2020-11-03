import mongoose from "mongoose";
/*
    id: firestoreId
    name: string,
    price: float/number
*/
const schema = mongoose.Schema({
  id: String,
  name: String,
  price: Number,
});

export default mongoose.model("Product", schema);
