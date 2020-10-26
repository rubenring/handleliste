import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();

app.listen({ port: process.env.PORT }, () => {
  console.log(`🚀 Server listening on port ${process.env.PORT}`);
});
