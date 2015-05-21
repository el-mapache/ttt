var React = require('react'),
    Game = require('./components/Game.js'),
    request = require('superagent');

request.get('/game')
  .set('Accept', 'application/json')
  .end(function(err, res) {
    React.render(<Game game={res.body}/>, document.getElementById('tic-tac-toe'));
});

