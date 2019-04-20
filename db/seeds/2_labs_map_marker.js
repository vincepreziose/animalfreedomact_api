const fs = require('fs');

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  return knex('labs_map_marker').del()
    .then(() => {
      const fileContents = fs.readFileSync(__dirname + '/data/labs.json', 'utf8');
      const labsObject = JSON.parse(fileContents);

      let mapMarkers = [];
      labsObject.labs.forEach((lab, i) => {
        mapMarkers.push({
          lab_id: i+1,
          lat: lab.mapMarker.lat,
          lng: lab.mapMarker.lng
        });
      });

      // Inserts seed entries
      return knex('labs_map_marker').insert(mapMarkers);
    });
};
