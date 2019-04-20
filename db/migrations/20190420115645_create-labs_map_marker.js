// Create the labs_map_marker table
exports.up = async (knex) => {
  return knex.schema.createTable('labs_map_marker', (t) => {
    t.increments('id').unsigned().primary();
    t.integer('lab_id')
      .references('id')
      .inTable('labs')
      .unsigned()
      .notNullable()
      .onDelete('CASCADE');
    t.float('lat').notNullable();
    t.float('lng').notNullable();
    t.dateTime('created_at').notNull();
    t.dateTime('updated_at').nullable();
  });
};

exports.down = async (knex) => {
  return knex.schema.dropTable('labs_map_marker');
};