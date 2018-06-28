sap.ui.define([
    "sap/ui/core/mvc/Controller"
    
], function(Controller) {
	"use strict";
	
	return Controller.extend("sap.ui.iba.practic.controller.Contacts", {
	
	   	onNavBack: function (oEvent) {

         this.getOwnerComponent().getRouter().navTo("menu", {}, true);
	  	}
	});
});