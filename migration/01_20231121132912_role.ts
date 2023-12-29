import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(
    "roles",
    function (table: Knex.CreateTableBuilder) {
      table.increments("id");
      table.string("name").notNullable();
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("roles");
}
