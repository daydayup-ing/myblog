var express = require('express');
var router = express.Router();

var checkLogin = require('../middlewares/check').checkLogin;

// 登出动作
// GET  /signout
router.get('/',checkLogin,function (req,res,next) {
    res.send(req.flash());
});

module.exports = router;