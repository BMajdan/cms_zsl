const { apiRoutes, ensureAuthorized} = require('../routes');
const { Teachers } = require('../schemas');

apiRoutes.post('/add-teacher', ensureAuthorized, function (req, res) {
  Teachers.create(req.body.data, function (err) {
    if (err) throw err;

    res.json({
      success: true,
      message: 'Poprawnie dodano nauczyciela do bazy danych'
    });
  });
});

apiRoutes.put('/edit-teacher', ensureAuthorized, function (req, res) {
  Teachers.findOne({ teacherIdent: req.body.data.teacherIdent }, function (err, doc) {
    if (err) throw err;

    if (doc) {
      for (let id in req.body.data) {
        doc[id] = req.body.data[id];
      }

      doc.save(function (err) {
        if (err) throw err;

        res.json({
          success: true,
          message: 'Poprawnie edytowano nauczyciela'
        });
      });
    } else {
      res.json({
        success: false,
        message: 'Nie udało się edytować nauczyciela'
      });
    }
  });
});

apiRoutes.delete('/delete-teacher', ensureAuthorized, function (req, res) {
  Teachers.remove({ teacherIdent: req.query.teacherIdent }, function (err) {
    if (err) throw err;

    res.json({
      success: true,
      message: 'Poprawnie usunięto nauczyciela z bazy danych'
    });
  });
});

module.exports = {};