const mongoose = require('mongoose');

let usersSchema = mongoose.Schema({
  login: String,
  password: String,
  name: String,
  surname: String,
  email: String,
  isLogin: Boolean,
  admin: Boolean
});

let newsSchema = mongoose.Schema({
  postTitle: String,
  postIdent: String,
  postData: String,
  postShort: String,
  postMiniature: String,
  postMiniatureSmall: String,
  postTags: Array,
  postText: String,
  postAuthor: String,
  postTeacher: String,
  postPublished: Boolean,
  widgets: Array
});

let specializationsSchema = mongoose.Schema({
  specializationName: String,
  specializationIdent: String,
  specializationText: String,
  specializationSchool: String,
  widgets: Array
});

let teachersSchema = mongoose.Schema({
  name: String,
  surname: String,
  avatar: String,
  description: String
});

let eventsSchema = mongoose.Schema({
  eventTitle: String,
  eventIdent: String,
  eventData: String,
  eventStartDate: String,
  eventStopDate: String,
  eventStartTime: String,
  eventStopTime: String,
  eventShort: String,
  eventMiniature: String,
  eventMiniatureSmall: String,
  eventTags: Array,
  eventText: String,
  eventAuthor: String,
  eventTeacher: String,
  eventPublished: Boolean,
  widgets: Array
});

let documentsSchema = mongoose.Schema({
  name: String,
  description: String,
  class: String
});

let Events = mongoose.model('Events', eventsSchema, 'Events');
let Teachers = mongoose.model('Teachers', teachersSchema, 'Teachers');
let Specializations = mongoose.model('Specializations', specializationsSchema, 'Specializations');
let News = mongoose.model('News', newsSchema, 'News');
let Users = mongoose.model('Users', usersSchema, 'Users');
let Documents = mongoose.model('Documents', documentsSchema, 'Documents');

module.exports = { Users, News, Specializations, Teachers, Events, Documents};