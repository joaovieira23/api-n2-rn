
import knex from "knex";
import knexConfig from "./knex";

const environment = process.env.NODE_ENV || "development";

export default knex(knexConfig[environment]);