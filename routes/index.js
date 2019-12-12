var express = require('express');
var router = express.Router();
//引入数据库包

var query = require('../api/query');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html', { title: 'ExpressTitle' });
});

/**
 * 参数 model
 */
router.get('/get/ModelRating/', query.getModelRating);

/**
 * 参数 model
 */
router.get('/get/FaultDist/', query.getFaultDist);

/**
 * 参数 model
 */
router.get('/get/impression/', query.getImpression);

module.exports = router;
