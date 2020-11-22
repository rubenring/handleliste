import mongoose from "mongoose";
import { DatabaseError } from "../Errors/CustomError";

export const getStatus = () => {
  try {
    return mongoose.connection.readyState;
  } catch (e) {
    throw new DatabaseError("Not connected to Database");
  }
};
