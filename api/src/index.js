import dotenv from "dotenv";
import express from "express";
import path from "path";
import apiRoutes from "./routes/index.js";
import mongoose from "mongoose";
import dbConfig from "../configurations/dbConfigurations.js";
dotenv.config();

mongoose
  .connect(
    `${dbConfig.mongodb.url}/${dbConfig.mongodb.databaseName}`,
    dbConfig.mongodb.options
  )
  .then(() => {
    console.log(`Database connected`);

    const app = express();

    app.use(express.json());

    app.use(express.static(path.join(__dirname, "/static")));

    var test = "test";
    app.use("/api", apiRoutes);

    app.listen({ port: process.env.PORT }, () => {
      console.log(`🚀 Server listening on port ${process.env.PORT}`);
    });
  })
  .catch((e) => {
    console.log(`CONNECTION ERROR ${e}`);
  });
