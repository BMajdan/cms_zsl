const jwt = require('jsonwebtoken');
const settings = require('./settings');
const apiRoutes = require('./routes');

/*apiRoutes.use(function (req, res, next) {
  console.log(req.originalUrl);
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, settings.secret, function (err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
});*/

require('./components/users');
require('./components/events');
require('./components/news');
require('./components/specializations');
require('./components/teachers');
require('./components/files');

module.exports = {};