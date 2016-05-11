var test = require("tape");
var server = require('../server.js');

test("'/' returns 200 statusCode", function (t) {
    server.inject({method: 'GET', url: '/'}, function (res) {
        t.equal(res.statusCode, 200, 'page loaded successfully');
        t.end();
    });
});

test("'/static/{file*}' returns 200 statusCode", function (t) {
    server.inject({method: 'GET', url: '/static/public/css/main.css'}, function (res) {
        t.equal(res.statusCode, 200, 'static file retrieved');
        t.end();
    });
});

test("'/api/products/random' returns stringified object", function (t) {
    server.inject({method: 'GET', url: '/api/products/random'}, function (res) {
        t.equal(typeof res.payload, 'string', 'random product retrieved');
        t.end();
    });
});

test("REDISCLOUD_URL is not undefined", function (t) {
    t.notEqual(process.env.REDISCLOUD_URL, undefined, "environment variable defined");
    t.end();
});
