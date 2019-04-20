const fs = require('fs');

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  return knex('labs_report_data').del()
    .then(() => {
      const fileContents = fs.readFileSync(__dirname + '/data/labs.json', 'utf8');
      const labsObject = JSON.parse(fileContents);

      let reportData = [];
      labsObject.labs.forEach((lab, i) => {
        lab.reportData.forEach(record => {
          const cleansedRecord = {
            lab_id: i+1,
            a: record.a,
            b: record.b === '' ? null : parseInt(record.b),
            c: record.c === '' ? null : parseInt(record.c),
            d: record.d === '' ? null : parseInt(record.d),
            e: record.e === '' ? null : parseInt(record.e),
            notes: record.notes
          }
          reportData.push(cleansedRecord);
        });
      });

      // Inserts seed entries
      return knex('labs_report_data').insert(reportData);
    });
};
