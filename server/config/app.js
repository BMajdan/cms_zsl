const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const settings = require('./settings');
const fileUpload = require('express-fileupload');

const app = express();

app.use('/api/gallery', express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

mongoose.connect(settings.database, settings.databaseOptions);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Database connection error:'));
db.once('open', function () {
  console.log('Database connection');
  const { logOutAllUsers } = require('./components/users');
  logOutAllUsers();
});

module.exports = app;