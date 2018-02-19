const fs = require('fs');
const path = require('path');

const upload = (req, callback) => {
    // 获得文件的临时路径
    let file = req.file;
    let tmp_path = file.path;
    // 指定文件上传后的目录 - 示例为"images"目录。
    let filename = file.filename + path.extname(file.originalname);
    let target_path = 'upload/' + filename;
    // // 移动文件
    fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        // 删除临时文件夹文件,
        fs.unlink(tmp_path, function() {
            if (err) throw err;
            callback({
                path: target_path,
                size: file.size
            });
        });
    });

};

module.exports = upload;