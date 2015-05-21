var React = require('react'),
    Board = require('./Board.js'),
    Player = require('./Player.js'),
    request = require('superagent');

var Game = React.createClass({
  // set up default values from the server
  getInitialState: function() {
    return this.props.game;
  },

  getMessagesFor: function(player) {
    return this.state.messages[player.name];
  },

  getPlayer: function(player, index) {
    var position = index ? 'right' : 'left';
    var messages = this.getMessagesFor(player);

    return <Player key={index} position={position} handleClick={this.deleteMessageFor} messages={messages} player={player} />
  },

  getCurrentPlayerName: function() {
    return this.state.players[this.state.currentPlayer].name;
  },

  getSystemMessage: function() {
    var message = '';

    if (this.state.gameOver) {
      message = 'game over!';
    } else {
      message = this.getCurrentPlayerName() + '\'s turn!';
    }

    return (
      <div className="row">
        <h2 className="block-align">{message}</h2>
      </div>
    );
  },

  render: function() {
    return (
      <div>
        <div className="row">
          {this.state.players.map(this.getPlayer)}
        </div>
        {this.getSystemMessage()}
        <div className="row block-align">
          <button type="button" onClick={this.reset}>Reset</button>
        </div>
        <Board locked={this.state.winner} board={this.state.board} gridSize={3} handleClick={this.handleClick}/>
      </div>
    );
  },

  handleClick: function(index, event) {
    var state = this.state;

    if (this.state.winner) {
      return;
    }

    var symbol = state.players[state.currentPlayer].symbol;
    var self = this;

    request.put('/game')
      .send({position: index, symbol: symbol})
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if (res.ok) {
          self.setState(res.body);
        }
    });
  },

  
  // Could be refactored into a store with flux
  deleteMessageFor: function(name, index) {
    var self = this;
    request.del('/players/'+name+'/messages/'+index)
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if (res.ok) {
          self.setState(res.body);
        }
      });
  },

  reset: function() {
    request.get('/game/new')
      .set('Accept', 'application/json')
      .end(function(err, res) {
        this.setState(res.body);
        console.log(this.state);
      }.bind(this)); 
  } 
});

module.exports = Game;

