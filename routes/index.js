var express = require('express');
var router = express.Router();

const app = require('../app');

router.get('/', function(req, res, next) {
  res.render('index.html');
});

module.exports = router;
