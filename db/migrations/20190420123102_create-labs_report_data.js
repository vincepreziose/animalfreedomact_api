// Create the labs_map_marker table
exports.up = async (knex) => {
  return knex.schema.createTable('labs_report_data', (t) => {
    t.increments('id').unsigned().primary();
    t.integer('lab_id')
      .references('id')
      .inTable('labs')
      .unsigned()
      .notNullable()
      .onDelete('CASCADE');
    t.string('a').nullable();
    t.string('b').nullable();
    t.string('c').nullable();
    t.string('d').nullable();
    t.string('e').nullable();
    t.string('notes').nullable();
    t.dateTime('created_at').notNull();
    t.dateTime('updated_at').nullable();
  });
};

exports.down = async (knex) => {
  return knex.schema.dropTable('labs_report_data');
};