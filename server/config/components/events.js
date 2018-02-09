const { apiRoutes, ensureAuthorized } = require('../routes');
const { Events } = require('../schemas');

apiRoutes.post('/add-event', ensureAuthorized, function (req, res) {
  Events.create(req.body.data, function (err) {
    if (err) throw err;

    res.json({
      success: true,
      message: 'Poprawnie dodano wydarzenie do bazy danych'
    });
  });
});

apiRoutes.put('/edit-event', ensureAuthorized, function (req, res) {
  Events.findOne({ eventIdent: req.body.data.eventIdent }, function (err, doc) {
    if (err) throw err;

    if (doc) {
      for (let id in req.body.data) {
        doc[id] = req.body.data[id];
      }

      doc.save(function (err) {
        if (err) throw err;

        res.json({
          success: true,
          message: 'Poprawnie edytowano wydarzenie'
        });
      });
    } else {
      res.json({
        success: false,
        message: 'Nie udało się edytować wydarzenia'
      });
    }
  });
});

apiRoutes.delete('/delete-event', ensureAuthorized, function (req, res) {
  Events.remove({ eventIdent: req.query.eventIdent }, function (err) {
    if (err) throw err;

    res.json({
      success: true,
      message: 'Poprawnie usunięto wydarzenie z bazy danych'
    });
  });
});

module.exports = {};