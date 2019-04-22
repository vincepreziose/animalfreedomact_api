// Create the lab table
exports.up = async (knex) => {
  return knex.schema.createTable('users', (t) => {
    t.increments('id').unsigned().primary();
    t.string('email').notNullable();
    t.string('password').notNullable();
    t.dateTime('created_at').defaultTo(knex.fn.now());
    t.dateTime('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = async (knex) => {
  return knex.schema.dropTable('users');
};
