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
}

module.exports = Lab;
