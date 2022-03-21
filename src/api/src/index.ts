import dotenv from "dotenv";
dotenv.config();

import { createServer } from "./server";
import db from "./db";
import knexConfig from "./knex";

const port = process.env.PORT || 8000;
const environment = process.env.NODE_ENV || "development";

const server = createServer();

db.migrate.latest(knexConfig[environment].migrations).then(() => {
  server.listen(port, () => console.log(`listening port ${port}`));
});