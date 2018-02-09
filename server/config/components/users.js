const { Users } = require('../schemas');
const { apiRoutes, ensureAuthorized} = require('../routes');

let logOutAllUsers = function(){
  Users.update({}, { isLogin: false }, { multi: true }, function () {
    console.log('Logout all users!');
  });
};

apiRoutes.put('/logout', ensureAuthorized, function (req, res) {
    Users.findOneAndUpdate({ login: req.body.login }, { isLogin: false }, function (err) {
      if(err) throw err;
      res.json({ success: true, message: 'Poprawnie wylogowano użytkownika z serwisu.' });
    });
});

module.exports = { logOutAllUsers };