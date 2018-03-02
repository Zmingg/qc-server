const qiniu = require('qiniu');
const key = require('./key');

exports.uploadToken = (req, callback) => {
    let options = {
        scope: 'qcblog-upload'
    };
    let putPolicy = new qiniu.rs.PutPolicy(options);
    let mac = new qiniu.auth.digest.Mac(key.ACCESS_KEY, key.SECRET_KEY);
    callback({
        ok: true,
        uptoken: putPolicy.uploadToken(mac)
    });
};