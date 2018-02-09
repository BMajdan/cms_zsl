const express = require('express');
const jwt = require('jsonwebtoken');

const apiRoutes = express.Router();
const settings = require('./settings');

let ensureAuthorized = function(req, res, next) {
  let token = req.body.token || req.query.token || req.headers['x-access-token'];
  console.log(token)
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
};

module.exports = { apiRoutes, ensureAuthorized};