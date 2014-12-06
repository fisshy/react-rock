var BoilerplateConstants = require('../constants/boilerplate.js');
var AppDispatcher = require('../../../dispatchers/app_dispatcher.js');

var BoilerplateActions = {
  listBoilerplate : function(customerId) {
    AppDispatcher.handleViewAction({
      actionType : BoilerplateConstants.LIST_BOILERPLATE
    });
  }
};

module.exports = BoilerplateActions;