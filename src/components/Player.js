var React = require('react'),
    Message = require('./Message.js');

var Player = React.createClass({
  getInitialState: function() {
    return {
      active: false
    };
  },

  getMessage: function(message, index) {
    return <Message key={index} position={this.props.position} handleClick={this.props.handleClick} owner={this.props.player.name} index={index} message={message} />
  },

  getStyle: function() {
    return {
      float: this.props.position,
      "textAlign": this.props.position
    };
  },

  render: function() {
    var player = this.props.player;
    var position = this.props.position;
    var symbolClasses = "player__symbol player__symbol-" + position + " u-pull-" + position;

    return (
      <div style={this.getStyle()}>
        <h2 className="player__name">{player.name}</h2>
        <div className="player row">
          <p className={symbolClasses}>{player.symbol}</p>
          {this.props.messages.map(this.getMessage)}
        </div>
      </div>
    );
  }
});

module.exports = Player;

