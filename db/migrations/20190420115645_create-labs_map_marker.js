// Create the labs_map_marker table
exports.up = async (knex) => {
  return knex.schema.createTable('labs_map_marker', (t) => {
    t.increments('id').unsigned().primary();
    t.integer('lab_id').unsigned()
      .references('id')
      .inTable('labs')
      .withKeyName('fk_labs_map_marker_labs')
      .onDelete('CASCADE');
    t.float('lat', 12, 7).notNullable();
    t.float('lng', 12, 7).notNullable();
    t.dateTime('created_at').defaultTo(knex.fn.now());
    t.dateTime('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = async (knex) => {
  return knex.schema.dropTable('labs_map_marker');
};