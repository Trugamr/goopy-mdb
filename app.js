var express = require('express');
var app = express();
var routes = require('./routes');
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get('/', routes.home);

app.get('/search=:search?', routes.result);

app.get('/search=:search?/JSON', routes.resultJSON);

app.get('/id=:id?', routes.fullinfo);

app.get('/id=:id?/JSON', routes.fullinfoJSON);

app.get('/torrents=:tor_id?', routes.torrents);

app.get('*', routes.notFound);

app.listen(process.env.PORT || 8080, function() {
    console.log('Server Running');
});
