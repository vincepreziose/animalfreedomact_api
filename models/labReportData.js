'use strict';

const { Model } = require('objection');

class LabReportData extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'labs_report_data';
  }

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['a', 'b', 'c', 'd', 'e', 'notes'],

      properties: {
        id: { type: 'integer' },
        a: { type: 'string', minLength: 1, maxLength: 255 },
        b: { type: 'integer' },
        c: { type: 'integer' },
        d: { type: 'integer' },
        e: { type: 'integer' },
        notes: { type: 'string', minLength: 1, maxLength: 255 }
      }
    };
  }

  static get relationMappings() {
    return {
      mapMarkers: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/lab`,
        join: {
          from: 'labs_report_data.lab_id',
          to: 'labs.id'
        }
      }
    }
  }

  static get namedFilters() {
    return {
      getReportDataEager: (builder) => {
        builder
          .alias('rd')
          .select('rd.a', 'rd.b', 'rd.c', 'rd.d', 'rd.e', 'rd.notes')
          .join('labs as l', 'l.id', 'rd.lab_id');
      }
    }
  }
}

module.exports = LabReportData;
