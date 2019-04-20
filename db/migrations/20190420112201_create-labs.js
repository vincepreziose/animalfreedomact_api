// Create the lab table
exports.up = async (knex) => {
  return knex.schema.createTable('labs', (t) => {
    t.increments('id').unsigned().primary();
    t.string('name').notNull();
    t.string('address1').notNull();
    t.string('address2').nullable();
    t.string('city').notNull();
    t.string('certificateNum').notNull();
    t.dateTime('created_at').defaultTo(knex.fn.now());
    t.dateTime('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = async (knex) => {
  return knex.schema.dropTable('labs');
};
