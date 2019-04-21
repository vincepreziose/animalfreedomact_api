const Knex = require('knex');
const knexConfig = require('./knexfile');
const { Model } = require('objection');

const dbInit = async () => {
  console.log('  Connecting to database...');
  // Initialize knex.
  const knex = Knex(knexConfig.development);
  // Bind all Models to a knex instance.
  Model.knex(knex);
};

module.exports = dbInit;