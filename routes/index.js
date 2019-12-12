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

/**
 * 参数 model
 * 可选参数 year & month
 */
router.get('/get/sales/', query.getSales);

/**某月所有品牌的销量
 * 参数 year
 * 参数 month
 */
router.get('/get/allbrandsales/', query.getAllBrandSales);

/**
 * 参数 brand
 * 选择参数 year&week 或 begindate & enddate
 */
router.get('/get/heat/', query.getHeat);

/**某周所有品牌的热度
 * 参数 year
 * 参数 week
 */
router.get('/get/heatrank/', query.getHeatRank);


module.exports = router;
