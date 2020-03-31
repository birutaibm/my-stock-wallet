import * as Knex from "knex";

const TABLE_NAME = 'ir_movements';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.string('ticker').notNullable();
    table.dateTime('date').notNullable();
    table.bigInteger('value').notNullable();
    table.decimal('profit').notNullable();

    table.primary(['ticker', 'date']);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE_NAME);
}