var React = require('react');

var Space = React.createClass({
  render: function() {
    var classes = 'one-third column game__cell';

    if (this.props.locked || this.props.marker) {
      classes += ' cell-locked';
    }

    return (
      <div className={classes} onClick={this.handleClick}>
        <p>{this.props.marker}</p>
      </div>
    );
  },

  handleClick: function() {
    if (!this.props.marker) {
      this.props.handleClick();
    }
  }
});

module.exports = Space;

