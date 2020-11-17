import mongoose from "mongoose";
import { dbConfig } from "../../configurations/index.js";

const db = mongoose.connect(
  `${dbConfig.mongodb.url}/${dbConfig.mongodb.databaseName}`,
  dbConfig.mongodb.options
);

//ds263028.mlab.com:63028/sisselogrubenshandleliste
//`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}`,

export default db;
//`${process.env.DB_HOST}${process.env.DB_NAME}`;
