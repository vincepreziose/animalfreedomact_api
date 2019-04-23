'use strict';

const { Model } = require('objection');

class LabMapMarker extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'labs_map_marker';
  }

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['lat', 'lng'],

      properties: {
        id: { type: 'integer' },
        lat: { type: 'decimal' },
        lng: { type: 'decimal' }
      }
    };
  }

  static get relationMappings() {
    return {
      mapMarkers: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/lab`,
        join: {
          from: 'labs_map_marker.lab_id',
          to: 'labs.id'
        }
      }
    }
  }

  static get namedFilters() {
    return {
      getMapMarkersEager: (builder) => {
        builder
          .alias('mm')
          .select('mm.lat', 'mm.lng')
          .join('labs as l', 'l.id', 'mm.lab_id');
      }
    }
  }
}

module.exports = LabMapMarker;
