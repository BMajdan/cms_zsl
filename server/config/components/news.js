const apiRoutes = require('../routes');
const { News } = require('../schemas');

apiRoutes.post('/add-post', function (req, res) {
  News.create(req.body.data, function (err) {
    if (err) throw err;

    res.json({
      success: true,
      message: 'Poprawnie dodano post do bazy danych'
    });
  });
});

apiRoutes.put('/edit-post', function (req, res) {
  News.findOne({ postIdent: req.body.data.postIdent }, function (err, doc) {
    if (err) throw err;
    
    if(doc){
      for (let id in req.body.data) {
        doc[id] = req.body.data[id];
      }

      doc.save(function (err) {
        if (err) throw err;

        res.json({
          success: true,
          message: 'Poprawnie edytowano post'
        });
      });
    }else{
      res.json({
        success: false,
        message: 'Nie udało się edytować posta'
      });
    }
  });
});

apiRoutes.delete('/delete-post', function (req, res) {
  News.remove({ postIdent: req.query.postIdent }, function (err) {
    if (err) throw err;

    res.json({
      success: true,
      message: 'Poprawnie usunięto post z bazy danych'
    });
  });
});

module.exports = {};