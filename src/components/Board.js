var React = require('react'),
    Row = require('./Row.js');

var Board = React.createClass({
  generateGrid: function() {
    var size = this.props.gridSize;
    var iterator = 0;
    var grid = [];

    while (iterator++ < size) {
      grid.push(<Row key={iterator} {...this.props} position={iterator} />);
    }

    return grid;
  },

  render: function() {
    return (
      <table>
        <tbody>
          {this.generateGrid()}
        </tbody>
      </table>
      );
    }
});

module.exports = Board;

