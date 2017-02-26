var path = require('path');
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('config-lite');  // 映射到config/default.js文件
var routes = require('./routes');  // 加载routes目录下所有路由处理文件
var pkg = require('./package');  // 加载package.json文件

var app = express();  // 创建express实例

// 设置模板目录
app.set('views',path.join(__dirname,'views'));
// 设置模板引擎为ejs
app.set('view engine','ejs');
// 设置静态文件目录;设置静态文件目录的中间件应该放到routes(app)之前加载,这样静态文件的请求就不会落到业务逻辑的路由里
app.use(express.static(path.join(__dirname,'public')));

// session中间件,读取config目录下default.js文件里面的内容(default.js默认不用写出来,所以config.session默认就是default.js里面的session键对应的值)
app.use(session({
    name: config.session.key, // 设置cookie中保存session id 的字段名称
    secret: config.session.secret, // 通过设置secret来计算hash值并放在cookie,是产生的signedCookie防篡改
    cookie: {
        maxAge: config.session.maxAge // 过期时间,过期后cookie中的session id自动删除
    },
    store: new MongoStore({  // 将session存储到mongodb
        url: config.mongodb  // mongodb地址
    })
}));

// flash中间件,用于页面显示flash消息;flash中间件应该放到session中间件之后加载,因为flash是基于session的
app.use(flash());

// 使用express-formidable处理	form表单(包括文件上传)
app.use(require('express-formidable')({
    uploadDir: path.join(__dirname,'public/img'),  // 上传文件目录
    keepExtensions: true // 上传文件的名称显示保留后缀
}));

// 设置模板全局常量,从package.json文件读取内容
app.locals.community = {
    title: pkg.name,
    version: pkg.version
};

// 添加模板必须的三个变量
app.use(function (req,res,next) {
    res.locals.user = req.session.user;
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    next();
});

// 路由
routes(app);

// 监听端口,启动程序
app.listen(config.port,function () {
    console.log(`${pkg.name} listening on port ${config.port}`);
});