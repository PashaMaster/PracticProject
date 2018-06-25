sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/ui/Device"
], function(Controller, Device) {
	"use strict";

	return Controller.extend("sap.ui.iba.practic.controller.menuPage", {
		
		onInit : function () {
			this.getOwnerComponent().getRouter().getRoute("menu").attachPatternMatched(this._onRouteMatched, this);
		},
		
		_onRouteMatched: function(oEvent) {
			
			if(!Device.system.phone) {
				this.getOwnerComponent().getRouter()
					.navTo("menu", {}, true);				
			}
		},
		
		goToTable: function(oEvent) {
			
			this.getOwnerComponent().getRouter()
					.navTo("table", {lang : "en"});				
				
		},

		goToInfo: function(oEvent) {
			
			this.getOwnerComponent().getRouter()
					.navTo("info");				
				
		}
	});

});