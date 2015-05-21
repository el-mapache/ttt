var React = require('react');

var Message = React.createClass({
  render: function() {
    return (
      <div className="player__messagebox u-pull-left">
        <span className="u-pull-right player__messagebox-close" onClick={this.props.handleClick.bind(null, this.props.owner, this.props.index)}>&times;</span>
        {this.props.message}
      </div>
    );
  }
});

module.exports = Message;

