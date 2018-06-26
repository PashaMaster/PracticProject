sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/resource/ResourceModel"
    
], function(Controller, ResourceModel) {
	"use strict";
	
	
	return Controller.extend("sap.ui.iba.practic.controller.Galary", {
	   	
		onNavBack: function (oEvent) {

			this.getOwnerComponent().getRouter().navTo("menu", {}, true);
      	}
	});
});