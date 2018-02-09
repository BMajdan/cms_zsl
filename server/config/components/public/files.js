const fs = require('fs');
const {apiRoutes} = require('../../routes');

apiRoutes.get('/gallery/:imageType/:typeTitle/:name', function (req, res) {
  let img = fs.readFileSync('./gallery/' + req.params.imageType + '/' + req.params.typeTitle + '/' + req.params.name);
  res.end(img, 'binary');
});

apiRoutes.get('/gallery/:imageType/:typeTitle/:folder/:name', function (req, res) {
  let img = fs.readFileSync('./gallery/' + req.params.imageType + '/' + req.params.typeTitle + '/' + req.params.folder + '/' + req.params.name);
  res.end(img, 'binary');
});

module.exports = {};