const mongoose = require('mongoose');

const dbInit = async () => {
  console.log('  Connecting to database...');
  mongoose.connect(process.env.DATABASE_URL, { useCreateIndex: true, useNewUrlParser: true });
  mongoose.Promise = global.Promise;
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
};

module.exports = dbInit;
