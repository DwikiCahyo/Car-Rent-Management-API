import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(
    "cars",
    function (table: Knex.CreateTableBuilder) {
      table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
      table.string("plate", 20).notNullable();
      table.string("manufacture", 100).notNullable();
      table.text("image").notNullable();
      table.string("model", 100).notNullable();
      table.string("type", 200).notNullable();
      table.text("description").notNullable();
      table.string("transmission", 20).notNullable();
      table.integer("capacity").notNullable();
      table.bigint("rentPerDay").notNullable();
      table.datetime("availableAt").notNullable().defaultTo(knex.fn.now());
      table.boolean("available").notNullable().defaultTo(false);
      table.integer("year", 4).notNullable();
      table.jsonb("options").notNullable();
      table.jsonb("specs").notNullable();
      table.integer("created_by").nullable().unsigned();
      table.integer("updated_by").nullable().unsigned();
      table.integer("deleted_by").nullable().unsigned();
      table
        .foreign("created_by")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table
        .foreign("updated_by")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table
        .foreign("deleted_by")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("cars");
}
