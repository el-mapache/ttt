var express = require('express');
var router = express.Router();

var Game = require('../services/Game.js');

router.get('/', isGameOver, function(req, res) {
  res.render('index');
});

var game = require('./game.js')(Game);
router.get('/game/new', isJSONRequest, game.new);
router.get('/game', isJSONRequest, hasCurrentGame, game.get);
router.put('/game', isJSONRequest, game.put);

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

