import { Knex } from "knex";
import * as bcrypt from "bcryptjs";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      email: "superadmin@mail.com",
      password: await bcrypt.hash("super123", 5),
      role_id: 1,
    },
    {
      email: "admin@mail.com",
      password: await bcrypt.hash("admin123", 5),
      role_id: 2,
    },
    {
      email: "user1@mail.com",
      password: await bcrypt.hash("user123", 5),
      role_id: 3,
    },
  ]);
}
