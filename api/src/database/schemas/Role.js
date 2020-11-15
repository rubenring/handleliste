import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: String,
});

const Role = mongoose.model("Role", schema);
export { schema as Role };
export default Role;
