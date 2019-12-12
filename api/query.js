var sqlquery = require('./sqlquery');
var safetycheck = require('./safetycheck');

// MySQL数据库联接配置
var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'bluepj'
});

function db(sql, callback) {
    pool.getConnection(function (err, connection) {
        // Use the connection
        connection.query(sql, function (err, rows) {
            if(err){
                console.log(err);
            }
            connection.release();//释放链接
            callback(err, rows);
        });
    });
}

exports.getModelRating = function (req, res) {
    console.log(req.query);
    if(! req.query.model){
        res.status(200).end("Lost model name");
        return -1;
    }
    var localsql = 
        "SELECT * FROM model_rating WHERE model='" + req.query.model + "';";
    //console.log('localsql is ' + localsql);

    db(localsql, function (err, resdata) {
        if (err) {
            res.end("查询失败：", err)
        } else {
            res.status(200).send(resdata);
        }
    });
}

exports.getFaultDist = function (req, res) {
    console.log(req.query);
    if(! req.query.model){
        res.status(200).end("Lost model name");
        return -1;
    }
    var localsql = 
        "SELECT * FROM fault_distribution WHERE model='" + req.query.model + "';";
    //console.log('localsql is ' + localsql);

    db(localsql, function (err, resdata) {
        if (err) {
            res.end("查询失败：", err)
        } else {
            res.status(200).send(resdata);
        }
    });
}

exports.getImpression = function (req, res) {
    console.log(req.query);
    if(! req.query.model){
        res.status(200).end("Lost model name");
        return -1;
    }
    var localsql = 
        "SELECT impression FROM impression WHERE model='" + req.query.model + "';";
    //console.log('localsql is ' + localsql);

    db(localsql, function (err, resdata) {
        if (err) {
            res.end("查询失败：", err)
        } else {
            res.status(200).send(resdata);
        }
    });
}

exports.getSales = function (req, res) {
    console.log(req.query);
    if(!req.query.model){
        res.status(200).end("Lost model name");
        return -1;
    }

    if(req.query.year & req.query.month){
        var localsql = 
                "SELECT `rank`, `price`, `salesNum`, `salesSum` FROM sales WHERE model='" + req.query.model + "' and `year`=" + req.query.year + " and `month`=" + req.query.month + ";"
    }else{
        var localsql = 
                "SELECT `year`, `month`, `salesNum` FROM sales WHERE model='" + req.query.model + "';"
    }

    console.log('localsql is ' + localsql);

    db(localsql, function (err, resdata) {
        if (err) {
            res.end("查询失败：", err)
        } else {
            res.status(200).send(resdata);
        }
    });
}

exports.getAllBrandSales = function (req, res) {
    console.log(req.query);
    if(!req.query.year || !req.query.month){
        res.status(200).end("enter year and month");
        return -1;
    }

    var localsql = 
    "SELECT `brand`, Sum( sales.salesNum ) AS salesSUM FROM sales WHERE sales.`year` =" +
    req.query.year + " and `month` =" + req.query.month +
    " GROUP BY sales.brand ORDER BY salesSUM DESC;"

    //console.log('localsql is ' + localsql);

    db(localsql, function (err, resdata) {
        if (err) {
            res.end("查询失败：", err)
        } else {
            res.status(200).send(resdata);
        }
    });
}

exports.getHeat = function (req, res) {
    console.log(req.query);
    if(!req.query.brand){
        res.status(200).end("Lost brand name");
        return -1;
    }

    if(req.query.year && req.query.week){
        var localsql = 
        "SELECT `heat`, `begin_date`, `end_date` FROM heat WHERE brand='" + req.query.brand + "' and year=" + req.query.year + " and week=" + req.query.week + ";";
    }else if(req.query.begindate && req.query.enddate){
        var localsql = 
        "SELECT `heat`, `begin_date`, `end_date` FROM heat WHERE brand='" + req.query.brand + "' and begin_date>='" + req.query.begindate + "' and end_date<='" + req.query.enddate + "';";
    }else{
        res.status(200).end("enter year&week or begindate&enddate");
        return -1;
    }

    //console.log('localsql is ' + localsql);

    db(localsql, function (err, resdata) {
        if (err) {
            res.end("查询失败：", err)
        } else {
            res.status(200).send(resdata);
        }
    });
}

exports.getHeatRank = function (req, res) {
    console.log(req.query);
    if(!req.query.year || !req.query.week){
        res.status(200).end("enter year and week");
        return -1;
    }

    var localsql = 
    "SELECT Sum(heat.heat) AS heatSUM, heat.brand FROM heat WHERE year=" + req.query.year + " and week=" + req.query.week + " GROUP BY heat.brand ORDER BY heatSUM DESC;"

    console.log('localsql is ' + localsql);

    db(localsql, function (err, resdata) {
        if (err) {
            res.end("查询失败：", err)
        } else {
            res.status(200).send(resdata);
        }
    });
}
