const conn = require('../conn');

exports.all = function (req, callback) {
    let query = 'select title from `blogs`';
    conn.query(query, (err, rows)=>{
        callback(rows);
    });
};

exports.page = function (req, callback) {
    let page = ~~req.body.page;
    let query = 'select b.id,c.name as cate,b.title,b.tags,b.thumb_img,b.abstract,b.click from `blogs` b\n' +
        'left join `cates` c on b.cate_id = c.id\n' +
        'order by b.id desc\n' +
        'limit ?,10';
    let offset = 10 * (page - 1);
    conn.query(query, offset, (err, rows)=>{
        query = 'SELECT count(*) as total from `blogs`';
        let data = rows;
        conn.query(query, offset, (err, rows)=>{
            let total = rows[0].total;
            let pages = Math.ceil(total/10);
            callback({
                data: data,
                hasmore: pages > page,
                curpage: page,
                pages: pages,
                total: total
            });
        });
    });
};

exports.get = function (req, callback) {
    let query = 'select b.*,u.nickname from `blogs` b\n' +
        'left join `users` u on b.user_id = u.id\n' +
        'where b.id = ?';
    conn.query(query, req.params.id, (err, rows)=>{
        if(rows.length){
            callback(rows[0]);
        } else {
            callback('不存在的数据');
        }
    });
};

exports.hot = function (req, callback) {
    let query = 'select id,title,thumb_img from `blogs` order by click desc limit ?';
    conn.query(query, ~~req.params.count, (err, rows)=>{
        if(err){
            callback('不存在的数据');
        } else {
            callback(rows);
        }
    });
};

exports.latest = function (req, callback) {
    let query = 'select id,title,thumb_img from `blogs` order by created_at desc limit ?';
    conn.query(query, ~~req.params.count, (err, rows)=>{
        if(err){
            callback('不存在的数据');
        } else {
            callback(rows);
        }
    });
};

exports.update = function (req, callback) {
    let body = req.body;
    let query = 'update `blogs` set\n' +
        'cate_id = ?, title = ?, content = ?, abstract = ?, tags = ?, created_at = ?, updated_at = ?, thumb_img = ?\n' +
        'where blogs.id = ?';
    conn.query(query, [
        body.cate_id,
        body.title,
        body.content,
        body.abstract,
        body.tags,
        body.created_at,
        body.updated_at,
        body.thumb_img,
        body.id,
    ], (err, rows)=>{
        if (err) {
            callback({
                ok: false,
                data: err
            });
        }
        if (rows.affectedRows === 1) {
            callback({
                ok: true,
                data: rows.message
            });
        }
    });
};

exports.create = function (req, callback) {
    let body = req.body;
    let query = 'insert into `blogs`\n' +
        '(cate_id, title,  content, abstract, tags, created_at, updated_at, user_id, thumb_img)\n' +
        'values\n' +
        '(?,?,?,?,?,?,?,?,?)';
    conn.query(query, [
        body.cate_id,
        body.title,
        body.content,
        body.abstract,
        body.tags,
        body.created_at,
        body.updated_at,
        body.user_id,
        body.thumb_img
    ], (err, rows)=>{
        if (err) {
            callback({
                ok: false,
                data: err
            });
        }
        if (rows.affectedRows === 1) {
            callback({
                ok: true,
                data: rows.message
            });
        }
    });
};

exports.delete = function (req, callback) {
    let id = req.body.id;
    let query = 'delete from `blogs` where id = ?';
    conn.query(query, id, (err, rows) => {
        if (err) {
            callback({
                ok: false,
                data: err
            });
        }
        if (rows.affectedRows === 1) {
            callback({
                ok: true,
                data: rows.message
            });
        }
    })
}