import mongoose from "mongoose";

export const getStatus = () => mongoose.connection.readyState;
