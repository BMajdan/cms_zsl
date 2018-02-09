const apiRoutes = require('../routes');
const { Specializations } = require('../schemas');

apiRoutes.post('/add-specialization', function (req, res) {
  Specializations.create(req.body.data, function (err) {
    if (err) throw err;

    res.json({
      success: true,
      message: 'Poprawnie dodano specjalizację do bazy danych'
    });
  });
});

apiRoutes.put('/edit-specialization', function (req, res) {
  Specializations.findOne({ specializationIdent: req.body.data.specializationIdent }, function (err, doc) {
    if (err) throw err;

    if (doc) {
      for (let id in req.body.data) {
        doc[id] = req.body.data[id];
      }

      doc.save(function (err) {
        if (err) throw err;

        res.json({
          success: true,
          message: 'Poprawnie edytowano specjalizację'
        });
      });
    } else {
      res.json({
        success: false,
        message: 'Nie udało się edytować specjalizacji'
      });
    }
  });
});

apiRoutes.delete('/delete-specialization', function (req, res) {
  Specializations.remove({ specializationIdent: req.query.specializationIdent }, function (err) {
    if (err) throw err;

    res.json({
      success: true,
      message: 'Poprawnie usunięto specjalizację z bazy danych'
    });
  });
});

module.exports = {};