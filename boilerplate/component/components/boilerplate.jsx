/** @jsx React.DOM */

'use strict'

var React = require('react');
var BoilerplateStore = require('../stores/boilerplate.js');
var BoilerplateActions = require('../actions/boilerplate.js');

var getBoilerplateItems = function() {
  return {items: BoilerplateStore.getBoilerplates()}
};

var Boilerplate = React.createClass({
  getInitialState: function() {
    return getBoilerplateItems();
  },
  componentWillMount:function(){
    BoilerplateStore.on('boilerplate.update', this.update);
  },
  componentWillUnmount: function() {
    BoilerplateStore.removeListener('boilerplate.update', this.update);
  },
  update: function() {
    this.setState(getBoilerplateItems());
  },
  render: function() {
    var items = this.state.items.map(function(item) {
      return (
          <li>
            {item.Boilerplate}
          </li>
        )
    });
    return (
      <div className="pure-g">
        <div className="pure-u-1">
          Boilerplate
        </div>
        <ul className="pure-u-1">
          {items}
        </ul>
      </div>
    )
  }
});

module.exports = Boilerplate;