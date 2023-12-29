import type { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

// Update with your config settings.

console.log(process.env.DATABASE_PRODUCTION);

export const config: Record<string, Knex.Config> = {
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
    connection: process.env.DATABASE_URL,
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
