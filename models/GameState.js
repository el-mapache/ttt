module.exports = function() {
  return {
    players: [],
    board: new Array(9),
    currentTurn: 0,
    currentPlayer: null,
    winner: null,
    maxPlayers: 2,
    messages: {
      system: []
    }
  };
};

