var React = require('react');

var Message = React.createClass({
  render: function() {
    return (
      <div className="message-box">
        <span onClick={this.props.handleClick.bind(null, this.props.owner, this.props.index)}>&times;</span>
        {this.props.message}
      </div>
    );
  }
});

module.exports = Message;

