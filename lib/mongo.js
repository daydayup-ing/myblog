var config = require('config-lite');  // config-lite会自动读取config目录下default.js的数据库配置
var Mongolass = require('mongolass');
var mongolass = new Mongolass();
mongolass.connect(config.mongodb);

exports.User = mongolass.model('User',{
    name: { type: 'string' },
    password: { type: 'string' },
    avatar: { type: 'string' },
    gender: { type: 'string',enum: ['m','f','x'] },
    bio: { type: 'string' }
});
exports.User.index({ name: 1 },{ unique: true }).exec();  // 添加唯一索引;给用户表的name字段添加索引,我们将通过用户名查询用户.设置用户名唯一