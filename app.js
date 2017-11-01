var express = require('express');
var app = express();
var routes = require('./routes');
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get('/', routes.home);

app.get('/search=:search?', routes.result);

app.get('/id=:id?', routes.fullinfo);

app.get('*', routes.notFound);

app.listen(process.env.PORT || 8080, function() {
    console.log('Server Running');
});
