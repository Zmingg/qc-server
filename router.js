const blog = require('./models/blog');
const user = require('./models/user');
const cate = require('./models/cate');

let res = (handle) => {
    return (req, res) => {
        handle(req, (data) => {
            res.send(data);
        });
    }
};

const multer = require('multer');
const { uploadToken } = require('./api/qiniu');

module.exports = (app) => {
    app.post('/sign_in', multer().none(), res(user.signIn));

    app.get('/blogs', res(blog.all));
    app.get('/blog/:id', res(blog.get));
    app.get('/blog_hot/:count', res(blog.hot));
    app.get('/blog_latest/:count', res(blog.latest));
    app.post('/blogs_p', multer().none(), res(blog.page));
    app.post('/blog/update', multer().none(), res(blog.update));
    app.post('/blog/create', multer().none(), res(blog.create));
    app.post('/blog/delete', multer().none(), res(blog.delete));

    app.post('/upload_token', multer().none(), res(uploadToken));

    app.get('/cates', res(cate.all));
    app.get('/cate/:id', res(cate.get));



};