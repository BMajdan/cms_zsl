const mkdirp = require('mkdirp');
const fs = require('fs');
const rimraf = require('rimraf');
const jimp = require('jimp');
const { apiRoutes, ensureAuthorized } = require('../routes');
const { Documents } = require('../schemas');

apiRoutes.post('/upload-image', ensureAuthorized, function (req, res) {
  let file = req.files.file;
  mkdirp(req.body.path, function () {
    file.mv(req.body.path + '/' + req.files.file.name, function (err) {
      if (err) throw err;

      if (req.body.type == 'miniature') {
        jimp.read(req.body.path + '/' + req.files.file.name, function (err, image) {
          if (err) throw err;

          image.resize(200, jimp.AUTO).quality(60).write(req.body.path + '/min_' + req.files.file.name);
          res.json({
            success: true,
            message: 'Poprawnie załadowano zdjęcie na serwer.'
          });
        });
      } else if (req.body.type == 'fullImage') {
        jimp.read(req.body.path + '/' + req.files.file.name, function (err, image) {
          if (err) throw err;

          rimraf(req.body.path + '/' + req.files.file.name, function () {
            image.quality(60).write(req.body.path + '/' + req.files.file.name);
            res.json({
              success: true,
              message: 'Poprawnie załadowano zdjęcie na serwer.'
            });
          });
        });
      }
    });
  });
});

apiRoutes.post('/add-file-info', ensureAuthorized, function (req, res) {

  if (req.body.oldName == undefined) {
    Documents.create(req.body.data, function (err) {
      if (err) throw err;

      res.json({
        success: true,
        message: 'Poprawnie wysłano plik na serwer!'
      });
    });
  }else{
    Documents.findOne({ name: req.body.oldName }, function (err, doc) {
      if (err) throw err;

      if (doc) {
        for (let id in req.body.data) {
          doc[id] = req.body.data[id];
        }

        doc.save(function (err) {
          if (err) throw err;

          res.json({
            success: true,
            message: 'Poprawnie edytowano plik'
          });
        });
      } else {
        res.json({
          success: false,
          message: 'Nie udało się edytować pliku'
        });
      }
    });
  }
});

apiRoutes.delete('/delete-file', ensureAuthorized, function (req, res) {
  Documents.remove({ name: req.query.name }, function (err) {
    if (err) throw err;

    fs.unlink('./documents/' + req.query.name, function (err) {
      if (err) throw err;

      res.json({
        success: true,
        message: 'Poprawnie usunięto plik z serwera.'
      });
    });
  });
});

apiRoutes.post('/upload-file', ensureAuthorized, function (req, res) {
  function saveFile() {
    let file = req.files.file;
    mkdirp(req.body.path, function () {
      file.mv(req.body.path + '/' + req.body.name, function (err) {
        if (err) throw err;

        res.json({
          success: true,
          message: 'Poprawnie wrzucono plik na serwer.'
        });
      });
    });
  }

  if (req.body.oldName == 'undefined') 
    saveFile();
   else 
    fs.rename('./documents/' + req.body.oldName, './documents/' + req.body.name, function (err) { 
      if (err) throw err;
      
      res.json({
        success: true,
        message: 'Poprawnie wrzucono plik na serwer.'
      });
    });
  
});

module.exports = {};