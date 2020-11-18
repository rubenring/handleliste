import mongoose from "mongoose";
const Schema = mongoose.Schema;

const User = new Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export { User };

export default mongoose.model("User", User);
