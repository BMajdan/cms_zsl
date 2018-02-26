const fs = require('fs');
const { Documents } = require('../../schemas');
const {apiRoutes} = require('../../routes');

apiRoutes.get('/gallery/:imageType/:typeTitle/:name', function (req, res) {
  let img = fs.readFileSync('./gallery/' + req.params.imageType + '/' + req.params.typeTitle + '/' + req.params.name);
  res.end(img, 'binary');
});

apiRoutes.get('/gallery/:imageType/:typeTitle/:folder/:name', function (req, res) {
  let img = fs.readFileSync('./gallery/' + req.params.imageType + '/' + req.params.typeTitle + '/' + req.params.folder + '/' + req.params.name);
  res.end(img, 'binary');
});

apiRoutes.get('/documents/:documentName', function (req, res) {
  let img = fs.readFileSync('./documents/' + req.params.documentName);
  res.end(img, 'binary');
});

apiRoutes.get('/load-all-documents', function (req, res) {
  Documents.find({}, function (err, obj) {
    if (err) throw err;

    res.json({
      success: true,
      message: 'Poprawnie załadowano wszystkie pliki',
      object: obj
    });
  });
});

module.exports = {};