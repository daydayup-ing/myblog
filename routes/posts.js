// 引用express框架
var express = require('express');
// 引用express框架的路由模块
var router = express.Router();

// 加载中间件的登录判断的键checkLogin所对应的对象----checkLogin函数)
var checkLogin = require('../middlewares/check').checkLogin;

// 路由处理动作,凡是需要登录的,会多出第二个参数为checkLogin函数

// 文章首页,根据参数params的不同有两种情况
// 1: GET  /posts  所有用户的文章
// 2: GET  /posts?author=xxx 特定用户的所有文章
router.get('/',function (req,res,next) {
    res.render('posts');
});

// 发表文章页面
// GET  /posts/create
router.get('/create',checkLogin,function (req,res,next) {
    res.send(req.flash());
});
// 发表文章动作
// POST  /posts/create
router.post('/create',checkLogin,function (req,res,next) {
    res.send(req.flash());
});

// 一篇文章的详情页面
// GET  /posts/:postId
router.get('/:postId',function (req,res,next) {
    res.send(req.flash());
});

// 更新文章页面
// GET /posts/:postId/edit
router.get('/:postId/edit',checkLogin,function(req,res,next){
    res.send(req.flash());
});
// 更新文章动作
// POST /posts/:postId/edit
router.post('/:postId/edit',checkLogin,function(req,res,next){
    res.send(req.flash());
});

// 删除一篇文章页面
// GET /posts/:postId/remove
router.get('/:postId/remove',checkLogin,function (req,res,next) {
    res.send(req.flash());
});

// 创建留言动作
// POST /posts/:postId/comment
router.post('/:postId/comment',checkLogin,function (req,res,next) {
    res.send(req.flash());
});

// 删除留言动作
// GET /posts/:postId/comment/:commentId/remove
router.get('/:postId/comment',checkLogin,function (req,res,next) {
    res.send(req.flash());
});

module.exports = router;
