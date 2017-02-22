var express = require('express');
var router = express.Router();

var checkNotLogin = require('../middlewares/check').checkNotLogin;

// 注册页面
// GET  /signup
router.get('/',checkNotLogin,function (req,res,next) {
    res.render('signup');
});
// 注册动作
// POST /signup
router.post('/',checkNotLogin,function (req,res,next) {
    res.send(req.flash());
});

module.exports = router;