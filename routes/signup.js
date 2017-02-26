var path = require('path');
var sha1 = require('sha1');
var express = require('express');
var router = express.Router();

var UserModel = require('../models/users');
var checkNotLogin = require('../middlewares/check').checkNotLogin;

// 注册页面
// GET  /signup
router.get('/',checkNotLogin,function (req,res,next) {
    res.render('signup');
});
// 注册动作
// POST /signup
router.post('/',checkNotLogin,function (req,res,next) {
    var name = req.fields.name;
    var gender = req.fields.gender;
    var bio = req.fields.bio;
    var avatar = req.files.avatar.path.split(path.sep).pop();
    var password = req.fields.password;
    var repassword = req.fields.repassword;

    // 校验参数
    try{
        if (!(name.length >= 1 && name.length <= 10)) {
            throw new Error('名字请限制在1-10个字符');
        }
        if (['m','f','x'].indexOf(gender) === -1 ) {
            throw new Error('性别只能是 m,f或x');
        }
        if (!(bio.length >= 1 && bio.length <=30 )) {
            throw new Error('个人简介请限制在1-30个字符');
        }
        if (!req.files.avatar.name) {
            throw new Error('缺少头像');
        }
        if (password.length < 6) {
            throw new Error('密码至少6个字符');
        }
        if (password !== repassword) {
            throw new Error('两次输入密码不一致');
        }
    } catch (e) {
        req.flash('error',e.message);
        return res.redirect('/signup');
    }

    // 明文密码加密,数据库中保存该加密后的密码;实际开发中应该使用更安全的bcrypt或scrypt加密
    password = sha1(password);

    // 把待写入数据库的用户信息整理成对象形式赋值给user变量
    var user = {
        name: name,
        password: password,
        gender: gender,
        bio: bio,
        avatar: avatar
    };

    // 调用用户模型(models/users.js)里面定义的create方法创建用户记录
    // 创建用户记录成功执行then语句块,否则执行catch语句块
    UserModel.create(user)
        .then(function (result){
            // result是插入mongodb后的用户记录,包含_id(该字段是插入mongodb时自动创建的);取出用户记录赋值给user变量
            user = result.ops[0];
            // 将变量中的用户密码字段去掉之后再存入session
            delete user.password;
            req.session.user = user;
            // 给出flash消息提示
            req.flash('success','注册成功');
            // 跳转到首页
            res.redirect('/posts');
        })
        .catch(function (e) {
            // 用户名被占用则跳回注册页,而不是错误页面
            if (e.message.match('E11000 duplicate key')) {
                req.flash('error','用户名已经被占用');
                return res.redirect('/signup');
            }
            next(e);
        })
});

module.exports = router;