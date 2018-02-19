const conn = require('../conn');
// const async = require('async');

exports.all = function (req, callback) {
    let query = 'select * from `cates`';
    conn.query(query, (err, rows)=>{
        if (err) {
            callback({
                ok: false,
                data: err
            })
        } else {
            callback({
                ok: true,
                data: rows
            })
        }
    });
};

exports.get = function (req, callback) {
    let query = 'select * from `cates` where id = ?';
    conn.query(query, req.params.id, (err, rows)=>{
        if (err) {
            callback({
                ok: false,
                data: err
            })
        } else if(rows.length){
            callback({
                ok: true,
                data: rows[0]
            })
        } else {
            callback({
                ok: false,
                data: '不存在的数据'
            })
        }
    });
};