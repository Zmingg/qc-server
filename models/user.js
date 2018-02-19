const conn = require('../conn');
// const async = require('async');
const crypto = require('crypto');

exports.signIn = function (req, callback) {
    let query = 'select * from `users` where name = ?';
    let username = req.body.name;
    let password = crypto.createHmac('sha256', req.body.pass)
        .update('I love cupcakes')
        .digest('hex');
    conn.query(query, username, (err, rows)=>{
        if (err) {
            callback({
                ok: false,
                data: err
            });
        }
        if (rows.length !== 0 ) {
            if (rows[0].password === password) {
                let user = rows[0];
                callback({
                    ok: true,
                    data: {
                        id: user.id,
                        name: user.name,
                        nickname: user.nickname,
                        email: user.email
                    }
                })
            } else {
                callback({
                    ok: false,
                    data: '用户名密码错误！'
                })
            }
        } else {
            callback({
                 ok: false,
                 data: '不存在的用户！'
            })
        }

    });
};