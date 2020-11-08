import dotenv from "dotenv";
import express from "express";
import path from "path";
import apiRoutes from "./routes/index";
import mongoose from "mongoose";

dotenv.config();

mongoose
  .connect("mongodb://localhost:27017/sisselogrubenshandleliste", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Database connected`);

    const app = express();

    app.use(express.json());

    app.use(express.static(path.join(__dirname, "/static")));

    app.use("/api", apiRoutes);

    app.listen({ port: process.env.PORT }, () => {
      console.log(`🚀 Server listening on port ${process.env.PORT}`);
    });
  })
  .catch((e) => {
    console.log(`CONNECTION ERROR ${e}`);
  });
