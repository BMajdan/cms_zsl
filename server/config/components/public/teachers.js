const apiRoutes = require('../../routes');
const { Teachers } = require('../../schemas');

apiRoutes.get('/load-all-teachers', function (req, res) {
  Teachers.find({}, function (err, obj) {
    if (err) throw err;

    res.json({
      success: true,
      message: 'Poprawnie załadowano wszystkich nauczycieli',
      object: obj
    });
  });
});

module.exports = {};