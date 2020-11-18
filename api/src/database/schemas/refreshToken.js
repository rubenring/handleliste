import moment from "moment";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  token: String,
  expires: Date,
  created: { type: Date, default: moment().utc() },
  createdByIp: String,
  revoked: Date,
  revokedByIp: String,
  replacedByToken: String,
});

schema.virtual("isExpired").get(function () {
  return moment().utc() >= this.expires;
});

schema.virtual("isActive").get(function () {
  return !this.revoked && !this.isExpired;
});

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
    delete ret._id;
    delete ret.id;
    delete ret.user;
  },
});

export default mongoose.model("RefreshToken", schema);
