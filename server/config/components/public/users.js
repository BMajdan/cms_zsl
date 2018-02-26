const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const settings = require('../../settings');
const {apiRoutes} = require('../../routes');
const {Users} = require('../../schemas');

apiRoutes.post('/authorize', function (req, res) {
  let hashPassword = crypto.createHash('sha256').update(req.body.password).digest('hex');
  Users.findOne({ login: req.body.login, password: hashPassword, isLogin: false }, function (err, user) {
    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Podaj poprawny login lub hasło.' });
    } else if (user) {
      Users.findOneAndUpdate({ login: req.body.userName }, { isLogin: true }, function (err) {
        if (err) throw err;

        const payload = { admin: user.admin };
        let token = jwt.sign(payload, settings.secret, { expiresIn: '1440m' });
        res.json({
          success: true,
          message: 'Poprawnie zalogowano użytkownika do serwisu!',
          token: token
        });
      });
    }
  });
});

apiRoutes.post('/short-login', function (req, res) {
  Users.findOneAndUpdate({ login: req.body.login }, { isLogin: true }, function (err, user) {
    if (err) throw err;

    const payload = { admin: user.admin };
    let token = jwt.sign(payload, settings.secret, { expiresIn: '1440m' });
    res.json({
      success: true,
      message: 'Poprawnie zalogowano użytkownika do serwisu!',
      token: token
    });
  });
});

module.exports = { };