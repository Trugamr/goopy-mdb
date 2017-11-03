const mdb = require('moviedb')('a564e5e6ccf05956046bad91fa92f76c');

var movieTrailer = require('movie-trailer');

const RarbgApi = require('rarbg');
const rarbg = new RarbgApi();

//home
exports.home = function(req, res) {
    res.render('home');
}

//search results 
exports.result = function(req, res) {
    var search = req.params.search;
    mdb.searchMovie({ query: search }, (err, data) => {
        res.render('result', {
            search: search,
            data: data
        })
    });
}

//full movie info 
exports.fullinfo = function(req, res) {
    var id = req.params.id;
    var ytid;
    mdb.movieInfo({ id: id }, (err, data) => {
        lastMovieJSON = data;
        movieTrailer(data.title, data.release_date.split('-', 1), true,function (err, ytdata) {
            if(ytdata[0].key == undefined || ytid == null)
                ytid = "RIP";
            ytid = ytdata[0].key;
            res.render('fullinfo', {
                data: data,
                ytid: ytid,
                id: id
            })
        });        
    });
}

//torrents
exports.torrents = function(req, res) {
    var tor_id = req.params.tor_id;
    mdb.movieInfo({ id: tor_id }, (err, movieData) => {
        res.set({
            'Content-Type' : 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        rarbg.search({
            search_imdb: tor_id,
            sort: 'seeders'
        }).then(function(torrentData) {
            res.render('torrents', {
                tor_id: tor_id,
                torData: torrentData,
                movData: movieData
            })
        })
    })
}

//404
exports.notFound = function(req, res) {
    res.send("The page you are looking for doesn't exist on this server :(");
}

//JSON Response 
exports.resultJSON = function(req, res) {
    var search = req.params.search;
    mdb.searchMovie({ query: search }, (err, data) => {
        res.json(data);
    });
}

exports.fullinfoJSON = function(req, res) {
    var id = req.params.id;
    var ytid;
    mdb.movieInfo({ id: id }, (err, data) => {
        lastMovieJSON = data;
        movieTrailer(data.title, data.release_date.split('-', 1), true,function (err, ytdata) {
            if(ytdata[0].key == undefined || ytid == null)
                ytid = "RIP";
            ytid = ytdata[0].key;
            data.ytid = ytid;
            data.exid = id;
            res.json(data);
        });        
    });
}
