var GameState = require('../models/GameState.js');
var Player = require('../models/Player.js');
var assign = require('object-assign');

module.exports = function(Game) {
  function start() {
    var game = new Game(assign({}, GameState()));
    game.addPlayers(new Player('Player1', 'x'), new Player('Player2', 'o'));
    game.takeTurn();

    return game.state;
  }

  return {
    get: function(req, res) {
      res.json(req.session.game);
    },

    new: function(req, res) {
      var game;

      req.session.game = null;
      req.session.game = start();
      req.session.save(function(err) {});

      res.json(req.session.game);
    },

    put: function(req, res) {
      var game = new Game(req.session.game);
      var position = req.body.position;
      var symbol = req.body.symbol;

      game.placeMarker(position, symbol);

      req.session.game = game.state;
      req.session.save(function(err) {});

      res.json(game.state);
    }
  };
}
