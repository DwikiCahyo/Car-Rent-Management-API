import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(
    "users",
    function (table: Knex.CreateTableBuilder) {
      table.increments("id");
      table.string("email", 255).notNullable();
      table.string("password", 255).notNullable();
      table.integer("role_id").unsigned().defaultTo(3);
      table
        .foreign("role_id")
        .references("id")
        .inTable("roles")
        .onDelete("CASCADE");
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}
