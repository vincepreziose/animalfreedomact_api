// Create the labs_map_marker table
exports.up = async (knex) => {
  return knex.schema.createTable('labs_report_data', (t) => {
    t.increments('id').unsigned().primary();
    t.integer('lab_id').unsigned()
      .references('id')
      .inTable('labs')
      .withKeyName('fk_labs_report_data_labs')
      .onDelete('CASCADE');
    t.string('a').nullable();
    t.string('b').nullable();
    t.string('c').nullable();
    t.string('d').nullable();
    t.string('e').nullable();
    t.string('notes').nullable();
    t.dateTime('created_at').defaultTo(knex.fn.now());
    t.dateTime('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = async (knex) => {
  return knex.schema.dropTable('labs_report_data');
};