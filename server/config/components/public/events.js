const apiRoutes = require('../../routes');
const { Events } = require('../../schemas');

apiRoutes.get('/load-all-events', function (req, res) {
  Events.find({}, null, { sort: { eventData: -1 } }, function (err, obj) {
    if (err) throw err;

    res.json({
      success: true,
      message: 'Poprawnie załadowano wszystkie wydarzenia',
      object: obj
    });
  });
});

apiRoutes.get('/load-one-event', function (req, res) {
  Events.find({ eventIdent: req.query.eventIdent }, function (err, obj) {
    if (err) throw err;

    res.json({
      success: true,
      message: 'Poprawnie załadowo jedeno wydarzenie',
      object: obj
    });
  });
});

module.exports = {};