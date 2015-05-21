var React = require('react'),
    Message = require('./Message.js');

var Player = React.createClass({
  getMessage: function(message, index) {
    return <Message key={index} handleClick={this.props.handleClick} owner={this.props.player.name} index={index} message={message} />
  },

  render: function() {
    var player = this.props.player;

    return (
      <div style={this.props.style}>
        <h2>{player.name}</h2>
        <div className="player__messagebox">
          <p className="player-symbol">{player.symbol}</p>
          {this.props.messages.map(this.getMessage)}
        </div>
      </div>
    );
  }
});

module.exports = Player;

