var express = require('express');
var router = express.Router();

var checkNotLogin = require('../middlewares/check').checkNotLogin;

// 登录页面
// GET  /signin
router.get('/',checkNotLogin,function (req,res,next) {
    res.send(req.flash());
});
// 登录动作
// POST  /signin
router.post('/',checkNotLogin,function (req,res,next) {
    res.send(req.flash());
});

module.exports = router;