const {apiRoutes} = require('../../routes');
const { Specializations } = require('../../schemas');

apiRoutes.get('/load-all-specializations', function (req, res) {
  Specializations.find({}, function (err, obj) {
    if (err) throw err;

    res.json({
      success: true,
      message: 'Poprawnie załadowano wszystkie specjalizacje',
      object: obj
    });
  });
});

apiRoutes.get('/load-one-specialization', function (req, res) {
  Specializations.find({ specializationIdent: req.query.specializationIdent }, function (err, obj) {
    if (err) throw err;

    res.json({
      success: true,
      message: 'Poprawnie załadowo jedeną specjalizację',
      object: obj
    });
  });
});

module.exports = {};