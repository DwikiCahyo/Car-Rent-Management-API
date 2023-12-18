import type { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.DATABASE_DEVELOPMENT);
console.log(process.env.CLOUD_NAME);

// Update with your config settings.

export const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: process.env.DATABASE_DEVELOPMENT,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./migration",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./seed",
    },
  },

  production: {
    client: "pg",
    connection: {
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./migration",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./seed",
    },
  },
};

export default config;
