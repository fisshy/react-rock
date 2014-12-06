var AppDispatcher = require('../../../dispatchers/app_dispatcher');
var BoilerplateConstants = require('../constants/boilerplate');
var merge = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var UPDATE_EVENT = "boilerplate.update";

var _boilerplates = [
    { Boilerplate : 'Item 1'},
    { Boilerplate : 'Item 2'},
    { Boilerplate : 'Item 3'},
    { Boilerplate : 'Item 4'}
  ];

function _getBoilerplates(){
  return _boilerplates;
};

var BoilerplateStore = merge({}, EventEmitter.prototype, {
  emitChange : function() {
    this.emit(UPDATE_EVENT);
  },
  getBoilerplates : function() {
    return _getBoilerplates();
  },
  dispatherIndex : AppDispatcher.register(function(payload) {
    var action = payload.action; // this is our action from handleViewAction
      switch(action.actionType){
        case BoilerplateConstants.LIST_BOILERPLATE:
          _getBoilerplates();
          break;
      }
      BoilerplateStore.emitChange();
      return true;
  })
});

module.exports = BoilerplateStore;
