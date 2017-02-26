var User = require('../lib/mongo').User;

module.exports = {
    // 创建用户记录的方法
    create: function create(user) {
        return User.create(user).exec();
    }
};