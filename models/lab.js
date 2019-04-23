'use strict';

const { Model } = require('objection');

class Lab extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'labs';
  }

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        address1: { type: 'string', minLength: 1, maxLength: 255 },
        address2: { type: 'string', minLength: 1, maxLength: 255 },
        city: { type: 'string', minLength: 1, maxLength: 255 },
        certificateNum: { type: 'string', minLength: 1, maxLength: 255 }
      }
    };
  }

  static async getLabsFull() {
    const labsFull = await this.query()
      .alias('l')
      .select(
        'l.id', 'l.name', 'l.address1', 'l.address2', 'l.city',
        'l.certificateNum', 'mm.lat', 'mm.lng', 'rd.a', 'rd.b', 'rd.c',
        'rd.e', 'rd.notes'
      )
      .join('labs_map_marker as mm', 'mm.lab_id', 'l.id')
      .join('labs_report_data as rd', 'rd.lab_id', 'l.id');

    return labsFull;
  }
}

module.exports = Lab;
