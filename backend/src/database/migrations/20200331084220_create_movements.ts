import * as Knex from "knex";

const TABLE_NAME = 'movements';

export async function up(knex: Knex): Promise<any> {
  knex.schema.createTable(TABLE_NAME, table => {
    table.bigIncrements('id');
    table.integer('bni_id');
    table.bigInteger('price');

    table.foreign('bni_id').references('id').inTable('brokerage_note_items');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE_NAME);
}
