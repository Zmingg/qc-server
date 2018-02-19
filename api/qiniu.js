const qiniu = require('qiniu');
const keys = require('./key');
let mac = new qiniu.auth.digest.Mac(keys.accessKey, keys.secretKey);

let uploadToken = () => {
    let options = {
        scope: 'qcblog-upload'
    };
    let putPolicy = new qiniu.rs.PutPolicy(options);
    return {
        uptoken: putPolicy.uploadToken(mac)
    }
};

module.exports = { uploadToken };