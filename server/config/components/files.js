const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const jimp = require('jimp');
const apiRoutes = require('../routes');

apiRoutes.post('/upload-image', function (req, res) {
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

module.exports = {};