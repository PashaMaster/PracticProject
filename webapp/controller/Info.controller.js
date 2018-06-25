sap.ui.define([
    "sap/ui/core/mvc/Controller"
    
], function(Controller) {
	"use strict";
	
	return Controller.extend("sap.ui.iba.practic.controller.Info", {
	   	
	   	onInit : function () {
         
          
         this.getOwnerComponent().getRouter().getRoute("table").attachPatternMatched(this._onRouteMatched, this);
		},

      	_onRouteMatched: function(oEvent) {
         
      	},

	   	onNavBack: function (oEvent) {

         this.getOwnerComponent().getRouter().navTo("menu", {}, true);
      	}
	});
});