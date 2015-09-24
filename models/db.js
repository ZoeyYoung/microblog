/*
 * 数据库连接配置模块
 */
var settings = require('../settings'),
    url = 'mongodb://' + settings.host + ':' + settings.port + '/' + settings.db;
	  MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

console.log("数据库连接URL: " + url);

module.exports = function(callback) {
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		console.log("Connected correctly to server");
		callback(db);
	});
};
