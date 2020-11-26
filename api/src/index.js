import express from "express";
import path from "path";
import apiRoutes from "./routes/index.js";
import seedRoles from "./database/seed/roles.js";
import cors from "cors";
import db from "./database/connector.js";
import morgan from "morgan";
import logger from "./logging/config.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import options from "./swagger/options.js";

const corsOptions = {
  origin: process.env.CLIENT_URL,
};
const specs = swaggerJsdoc(options);
const app = express();

app.use(cors(corsOptions));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api", apiRoutes);
app.use(express.static(path.join(__dirname, "/static")));
app.use(morgan("combined", { stream: logger.stream.write }));

db.then(() => {
  console.log(`Database connected`);
  seedRoles();
  app.listen({ port: process.env.PORT }, () => {
    console.log(`🚀 Server listening on port ${process.env.PORT}`);
  });
}).catch((e) => {
  console.log(`CONNECTION ERROR ${e}`);
});
