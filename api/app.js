var express = require('express');
var app = express();
var http = require('http').Server(app);

var easypost = require('easypost');
var fs = require('fs');
var path = require('path');

/* TODO use body-parser when npm works
var bodyParser = require('body-parser');
bodyParser.jsonParser = bodyParser.json(); */

String.prototype.toAbsolutePath = function () {
    var relativePath = this[0] == '/' ? this : '/' + this;
    return path.resolve(__dirname + relativePath);
};

String.prototype.parseIfJson = function () {
    try {
        return JSON.parse(this);
    } catch (e) {
        return this;
    }
};

app.paths = {
    clientApp: '../app'.toAbsolutePath(),
    index: '../app/index.html'.toAbsolutePath(),
    articles: 'data/articles.json'.toAbsolutePath(),
    log: 'data/log.txt'.toAbsolutePath()
};

app.get('/', function (req, res) {
    console.log('GET /');
    res.sendFile(app.paths.index);
});

app.get('/api/article', function (req, res) {
    console.log('GET /api/articles');
    res.sendFile(app.paths.articles);
});

app.post('/api/article', function (req, res) {
    easypost.get(req, res, function(data) {
        return console.log(data);
        var articlesStr = fs.readFileSync(app.paths.articles);
        var articlesJson = articlesStr.parseIfJson();
        articlesJson.push(req.body);
        fs.writeFileSync(app.paths.articles, articlesJson);
        fs.appendFile(app.paths.log, JSON.stringify(req.body));
        res.status(204);
    });
});

// static filesystem
app.use(express.static(app.paths.clientApp));

// handle 404 errors
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// send error page
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.contentType = 'text/plain';
    res.send(err.status + ' ' + err.message);
});

http.listen(61003, function () {
    console.log('listening on *:61003')
});