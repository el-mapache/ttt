var express = require('express');
var path = require('path');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var bodyParser = require("body-parser")

var app = express();
var routes = require('./routes');

/**
 * Configs
 */
var redisConfig = require('./config/redis.js')(session);
var sessionConfig = require('./config/session.js')(redisConfig);


app.use('/build', express.static(path.join(__dirname, '/build')));
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('consolidate').handlebars);
app.set('view engine','html');
app.use(session(sessionConfig));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/', routes);

app.set('port', process.env.PORT || 9090);

var server = app.listen(app.get('port'), function() {
  morgan('Express server listening on port ' + server.address().port);
});

