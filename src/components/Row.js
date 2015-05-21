var React = require('react'),
    Space = require('./Space.js');

var Row = React.createClass({
  generateSquares: function() {
    var size = this.props.gridSize;
    var iterator = size;
    var spaces = [];

    for (iterator; iterator > 0; iterator--) {
      var index = this.props.position * size - iterator;
      spaces.push(
        <Space key={index} locked={this.props.locked} marker={this.props.board[index]} handleClick={this.props.handleClick.bind(null, index)}/>
      );
    }

    return spaces;
  },

  render: function() {
    var row = this.props.row;

    return (
      <tr>
        {this.generateSquares()}
      </tr>
    );
  }
});

module.exports = Row;
