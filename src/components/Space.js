var React = require('react');

var Space = React.createClass({
  render: function() {
    var classes = '';

    if (this.props.locked || this.props.marker) {
      classes += ' cell-locked';
    }

    return (
      <td className={classes} onClick={this.handleClick}>{this.props.marker}</td>
    );
  },

  handleClick: function() {
    if (!this.props.marker) {
      this.props.handleClick();
    }
  }
});

module.exports = Space;

