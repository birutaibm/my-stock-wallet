import * as Knex from "knex";

const TABLE_NAME = 'brokerage_note_items';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.increments('id');
    table.enu('direction', ['Buy', 'Sell'], {
      useNative: true,
      enumName: 'direction'
    }).notNullable();
    table.string('ticker').notNullable();
    table.bigInteger('quantity').notNullable();
    table.bigInteger('unit_price').notNullable();
    table.integer('note_id').notNullable();

    table.foreign('note_id').references('id').inTable('brokerage_notes').onDelete('CASCADE');
  });
}


export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE_NAME);
}
