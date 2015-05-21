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
      <section className="row">
        <div className="twelve columns">
          {this.generateGrid()}
        </div>
      </section>
      );
    }
});

module.exports = Board;

