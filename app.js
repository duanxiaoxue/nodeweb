var express =require('express');
var http = require('http');
var URL = require('url');

var app = express();
var port = process.env.PORT || 3000
app.set('view engine', 'jade');
app.set('port',3000);
app.set('views','./views');
app.listen(port);

console.log("jian ting duankou "+ port);


app.get('/', function(req, res){
    res.render('index', {
        title: 'dxx首页'
    });
});


app.get('/movie/:id/:realname', function(req, res){
    var p = URL.parse(req.url,true);
    console.log( p.query.name);
    console.log( req.params.realname);
    res.render('detail', {
        title: 'dxx详情页',
        id: req.params.id,
        name: p.query.name

    });
});


app.get('/admin/movie', function(req, res){
    res.render('admin', {
        title: 'dxx后台管理'
    });
});

app.get('/admin/list', function(req, res){
    res.render('list', {
        title: 'dxx列表页'
    });
});

