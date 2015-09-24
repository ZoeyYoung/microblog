var db = require('./db'),
		assert = require('assert');
/*
 * 集合`users`的文档`User`构造函数
 * @param {Object} user: 包含用户信息的一个对象
 */
function User(user) {
	this.name = user.name;
	this.password = user.password;
};

module.exports = User;

/*
 * 保存一个用户到数据库
 * @param {Function} callback: 执行完数据库操作的应该执行的回调函数
 */
User.prototype.save = function save(callback) {
	var user = {
		name: this.name,
		password: this.password,
	};
	// Insert User
	db(function(db) {
		var collection = db.collection('users');
		collection.insert(user, {safe: true}, function(err, user) {
			assert.equal(null, err);
			callback(null);
			db.close();
		});
	});
}


/*
 * 查询在集合`users`是否存在一个制定用户名的用户
 * @param {String} username: 需要查询的用户的名字
 * @param {Function} callback: 执行完数据库操作的应该执行的回调函数
 */
User.get = function get(username, callback) {
	db(function(db) {
		var collection = db.collection('users');
		collection.findOne({name: username}, function(err, doc) {
			assert.equal(null, err);
			if (doc) {
				var user = new User(doc);
				callback(null, user);
			} else {
				callback(null);
			}
			db.close();
		});
	});
};
