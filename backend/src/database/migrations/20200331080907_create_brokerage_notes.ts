import * as Knex from "knex";

const TABLE_NAME = 'brokerage_notes';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.increments('id');
    table.dateTime('date').notNullable();
    table.bigInteger('value').notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE_NAME);
}

