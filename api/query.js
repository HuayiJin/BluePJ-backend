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
        "SELECT * FROM bluepj.model_rating WHERE model='" + req.query.model + "';";
    console.log('localsql is ' + localsql);

    db(localsql, function (err, resdata) {
        if (err) {
            res.end("查询失败：", err)
        } else {
            console.log(resdata);
            res.status(200).send(resdata);
        }
    });
}

