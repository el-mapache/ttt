var React = require('react/addons');
var ReactTransitionGroup = React.TransitionGroup;


var Message = React.createClass({
  getClasses: function() {
    return "player__messagebox-" + this.props.position + " u-pull-left animate animate-in"
  },


  render: function() {
    return (
      <div className={this.getClasses()}>
        <span className="u-pull-right player__messagebox-close" onClick={this.props.handleClick.bind(null, this.props.owner, this.props.index)}>&times;</span>
        {this.props.message}
      </div>
    );
  }
});

module.exports = Message;
