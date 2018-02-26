const {apiRoutes} = require('../../routes');
const { News } = require('../../schemas');

apiRoutes.get('/load-all-news', function (req, res) {
  News.find({}, null, { sort: { postData: -1 } }, function (err, obj) {
    if(err) throw err;

    res.json({
      success: true,
      message: 'Poprawnie załadowano wszystkie aktualności',
      object: obj
    });
  });
});

apiRoutes.get('/load-one-post', function (req, res) {
  News.find({ postIdent: req.query.postIdent }, function (err, obj) {
    if (err) throw err;

    console.log(req)

    res.json({
      success: true,
      message: 'Poprawnie załadowo jeden post',
      object: obj
    });
  });
});

module.exports = {};