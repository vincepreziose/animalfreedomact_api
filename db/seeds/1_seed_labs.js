const fs = require('fs');

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  return knex('labs').del()
    .then(() => {
      const fileContents = fs.readFileSync(__dirname + '/data/labs.json', 'utf8');
      const labsObject = JSON.parse(fileContents);

      let labs = [];
      labsObject.labs.forEach((lab, i) => {
        labs.push({
          // id: i+1,
          name: lab.name,
          address1: lab.address1,
          address2: lab.address2,
          city: lab.city,
          certificateNum: lab.certificateNum
        });
      });

      // Inserts seed entries
      return knex('labs').insert(labs);
    });
};
