import dotenv from "dotenv";
import express from "express";
import path from "path";
import apiRoutes from "./routes/index.js";
import mongoose from "mongoose";
import dbConfig from "../configurations/dbConfigurations.js";
import seedRoles from "./database/seed/roles.js";
import cors from "cors";
import db from "./database/connector.js";

dotenv.config();
const corsOptions = {
  origin: "http://localhost:3001",
};
db.then(() => {
  console.log(`Database connected`);
  seedRoles();
  const app = express();

  app.use(cors(corsOptions));

  app.use(express.json());

  app.use(express.static(path.join(__dirname, "/static")));

  app.use("/api", apiRoutes);

  app.listen({ port: process.env.PORT }, () => {
    console.log(`🚀 Server listening on port ${process.env.PORT}`);
  });
}).catch((e) => {
  console.log(`CONNECTION ERROR ${e}`);
});
