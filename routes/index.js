var express = require('express');
var router = express.Router();
var assign = require('object-assign');

var Game = require('../lib/Game.js');
var GameState = require('../models/GameState.js');
var AllMessages = require('../lib/Messages.js');

function Player(name, symbol) {
  this.name = name;
  this.symbol = symbol;
}

function startGame() {
  var game = new Game(assign({}, GameState()));
  game.addPlayers(new Player('Player1', 'x'), new Player('Player2', 'o'));
  game.takeTurn();

  return game.state;
}

router.get('/', isGameOver, function(req, res) {
console.log('gaminnnn');
  res.render('index');
});

router.get('/game', isJSONRequest, hasCurrentGame, function(req, res) {
  res.json(req.session.game);
});

router.get('/game/new', isJSONRequest, function(req, res) {
  var game;

  req.session.game = null;
  req.session.game = startGame();
  req.session.save(function(err) {});

  res.json(req.session.game);
});

router.put('/game', isJSONRequest, function(req, res) {
  var game = new Game(req.session.game);
  var position = req.body.position;
  var symbol = req.body.symbol;

  game.placeMarker(position, symbol);

  req.session.game = game.state;
  req.session.save(function(err) {});
  return res.json(game.state);
});

router.delete('/players/:name/messages/:index', isJSONRequest, hasCurrentGame, function(req, res) {
  var game = new Game(req.session.game);
  game.removeMessageFrom(req.params.name, req.params.index);

  req.session.save(function(err) {
    if (err) {}
  });

  res.json(req.session.game);
});


function isJSONRequest(req, res, next) {
  if (/application\/json/.test(req.headers.accept)) {
    return next();
  }

  res.redirect('/');
}

function hasCurrentGame(req,res,next) {
  if (!req.session.game) {
    return res.redirect('/game/new');
  }

  next();
}

function isGameOver(req,res,next) {
  if (req.session.game) {
    if (new Game(req.session.game).isLastTurn()) {
      req.session.game = null;
    }
  }
  next();
}

module.exports = router;

