var AllMessages = require('../services/Messages.js');

function Game(gameState) {
  var WIN_MAPS = [
    [null, null, null, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, null, null, null, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, null, null, null],
    [null, 1, 1, null, 1, 1, null, 1, 1],
    [1, null, 1, 1, null, 1, 1, null, 1],
    [1, 1, null, 1, 1, null, 1, 1, null],
    [null, 1, 1, 1, null, 1, 1, 1, null],
    [1, 1, null, 1, null, 1, null, 1, 1]
  ];

  var MAX_TURNS = gameState.board.length;

  function mapSolver(testMap, symbol) {
    return WIN_MAPS.some(function (winMap) {
      return winMap.every(function (item, idx) {
        if (item === null && testMap[idx] === symbol || item === 1) {
          return true;
        }
        return false;
      });
    });
  }

  return {
    state: gameState,

    addPlayers: function(player /** ...players **/) {
      var state = this.state;

      if (state.players.length === state.MaxPlayers) {
        return;
      }

      [].slice.call(arguments).forEach(function(player) {
        var playerName = player.name;
        var messages = state.messages;

        state.players.push(player);
        messages[playerName] = messages[playerName] || [];
        messages[playerName].push(AllMessages.sampleFrom('greetings'));
      });
    },

    getCurrentPlayer: function() {
      return this.state.players[this.state.currentPlayer];
    },

    setNextPlayer: function() {
      var players = this.state.players,
          currPlayer = this.state.currentPlayer;

      if (currPlayer === null) {
        this.state.currentPlayer = 0;
        return;
      }

      // If the last registered player has moved, reset to the first player.
      this.state.currentPlayer = currPlayer === (players.length - 1) ? 0 : currPlayer + 1;
    },

    isLastTurn: function() {
      return this.state.currentTurn === MAX_TURNS;
    },

    takeTurn: function() {
      if (this.state.currentTurn > 4) {
        if(this.isWinner() || this.isLastTurn()) {
          return;
        }
      }

      this.state.currentTurn += 1;
      this.setNextPlayer();
    },

    isWinner: function() {
      var currPlayer = this.getCurrentPlayer();
      var isGameOver = mapSolver(this.state.board, currPlayer.symbol);
      var self = this;

      if (isGameOver) {
        this.state.winner = currPlayer.name;
        this.addMessageTo(currPlayer.name, AllMessages.sampleFrom('win'));
        this.state.players.forEach(function(player) {
          if (player.name !== currPlayer.name) {
            self.addMessageTo(player.name, AllMessages.sampleFrom('lose'));
          }
        });

        this.endGame();

        return true;
      }
      if (this.isLastTurn()) {
        this.state.players.forEach(function(player) {
          self.addMessageTo(player.name, AllMessages.sampleFrom('draw'));
        });

        this.endGame();
      }
    },

    placeMarker: function(position, symbol) {
      var currPlayer = this.getCurrentPlayer();

      if (symbol === currPlayer.symbol && !this.state.board[position]) {
        this.state.board[position] = symbol;
        this.takeTurn();
      } else {
        this.addMessageTo(currPlayer.name, AllMessages.INVALID_MOVE)
      }
    },

    addMessageTo: function(player, message) {
      // TODO refactor to only have a single message as a string at any one time.
      this.state.messages[player].length = 0;
      this.state.messages[player].push(message);
    },

    removeMessageFrom: function(player, index) {
      var messages = this.state.messages[player];

      return !!(messages && messages.splice(index,1).length);
    },

    endGame: function() {
      this.state.gameOver = !this.state.gameOver;
    }
  };
}

module.exports = Game;
