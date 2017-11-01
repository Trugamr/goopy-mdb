const mdb = require('moviedb')('a564e5e6ccf05956046bad91fa92f76c');

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
    mdb.movieInfo({ id: id }, (err, data) => {
        res.render('fullinfo', {
            data: data,
            id: id
        })
    });
}

//404
exports.notFound = function(req, res) {
    res.send("The page you are looking for doesn't exist on this server :(");
}