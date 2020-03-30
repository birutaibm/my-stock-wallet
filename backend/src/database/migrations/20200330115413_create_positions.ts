import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('positions', (table) => {
    table.string('ticker').notNullable();
    table.dateTime('date').notNullable().defaultTo(knex.fn.now());
    table.integer('quantity').notNullable();
    table.decimal('price').notNullable();

    table.primary(['ticker', 'date']);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('positions');
}
