import type { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

// Update with your config settings.

export const config: { [key: string]: Knex.Config } = {
  development: {
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
