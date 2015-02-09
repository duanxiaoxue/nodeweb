var express =require('express');
var http = require('http');
var URL = require('url');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Movie = require('./models/movie.js');
var _ = require('underscore');
mongoose.connect('mongodb://localhost/nodejs');

var app = express();
var port = process.env.PORT || 3000 ;

app.set('view engine', 'jade');
app.set('port',3000);
app.set('views','./views/pages');
app.use(express.static(path.join(__dirname,'bower_components')));
app.listen(port);

console.log("jian ting duankou "+ port);

var movies = [
    {
        title:'xx黄金上海',
        _id:1,
        poster:'http://www.baidu.com/img/bdlogo.png',
        doctor:'mit',
        country:'中国',
        language:'中文',
        year:'2019',
        dec:'上海遍地黄金',
        flash:'http://share.vrs.sohu.com/my/v.swf&topBar=1&id=10737063&autoplay=false&from=page'
    },
    {
        title:'猛虎过江',
        _id:1,
        poster:'http://www.baidu.com/img/bdlogo.png',
        doctor:'mit',
        country:'中国',
        language:'中文',
        year:'2019',
        dec:'海面上的暴风雨',
        flash:'http://share.vrs.sohu.com/my/v.swf&topBar=1&id=10737063&autoplay=false&from=page'
    },

    {
        title:'一剑飘红',
        _id:1,
        poster:'http://www.baidu.com/img/bdlogo.png',
        doctor:'mit',
        country:'中国',
        language:'中文',
        year:'2019',
        dec:'高手对决，孤独求败',
        flash:'http://share.vrs.sohu.com/my/v.swf&topBar=1&id=10737063&autoplay=false&from=page'
    }
];

app.get('/', function(req, res){
     Movie.fetch(
        function(err,movies){
            if(err){
                console.log(err);
            }

            res.render('index', {
                title: 'gll首页',
                  movies:movies

            });
        }
    );

});

//http://localhost:3000/movie/1/"fgg"?name="vbb"
app.get('/movie/:id/:realname', function(req, res){
    var p = URL.parse(req.url,true);

    console.log( p.query.name);
    console.log( req.params.realname);
    Movie.findById(id,function(err,movie){
        res.render('detail', {
            title: 'gll详情页',
            id: req.params.id,
            name: p.query.name,
            //movie:movies[req.params.id]
            movie: movie


        });
    });

});


app.get('/admin/movie', function(req, res){

    res.render('admin', {
        title: 'gll后台管理',
        movie:{
            title:'',
            _id:'',
            poster:'',
            doctor:'',
            country:'',
            language:'',
            year:'',
            dec:'',
            flash:''
        }
    });
});
app.post('/admin/update/:id', function(req, res){
    var id = req.params.id;
    if(id){
      Movie.findById(id,function(err,movie){
          res.render('admin',{
              title: 'gll更新',
               movie: movie

              }
           );
      });
    }

});


app.post('/admin/movie/new', function(req, res){
    console.log("jjj");
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    console.log(req);
    console.log(req.body);
    exit();
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;

    if(id !== 'undefined'){
        Movie.findById(id,function(err,movie){
            if(err){
                console.log(err);
            }
            _movie = _.extend(movie,movieObj);
            _movie.save(function(err,movie){
               if(err){
                   console.log(err);
               }
                res.redirect('/movie/'+ movie._id);
            });


        })
    }else{
        _movie = new Movie({
            doctor: movieObj.doctor,
            title: movieObj.title,
            poster: movieObj.poster,
            country: movieObj.country,
            language: movieObj.language,
            dec: movieObj.dec,
            flash: movieObj.flash


        });
        _movie.save(function(err,movie){
            if(err){
                console.log(err);
            }
            res.redirect('/movie/'+ movie._id);
        });
    }

});

app.get('/admin/list', function(req, res){

   /* res.render('list', {
        title: 'gll列表页',
        movies:movies
    });*/


    Movie.fetch(
        function(err,movies){
            if(err){
                console.log(err);
            }

            res.render('index', {
                title: 'exx首页',
                movies:movies

            });
        }
    );
});

