import * as Knex from 'knex';
const configurations = require('../../knexfile.ts');

const connection = Knex.default(configurations.development);

export default connection;