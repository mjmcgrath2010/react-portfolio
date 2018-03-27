const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect('mongodb://localhost/test');
  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Mongo DB Connected.');
  });
};
