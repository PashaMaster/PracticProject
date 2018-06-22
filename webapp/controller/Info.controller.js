sap.ui.define([
    "sap/ui/core/mvc/Controller", 
    "sap/ui/core/routing/History",
    "sap/ui/Device"

], function(Controller, History, Device) {
	"use strict";
	
	return Controller.extend("sap.ui.iba.practic.controller.Info", {
	   	
	   	onInit : function () {
			this.getOwnerComponent().getRouter().getRoute("info").attachPatternMatched(this._onRouteMatched, this);
		},
		
		_onRouteMatched: function(oEvent) {
			
			if(!Device.system.phone) {
				this.getOwnerComponent().getRouter()
					.navTo("info", {}, true);				
			}
		},

		onNavBack : function () {
			
			var sPreviousHash = History.getInstance().getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getOwnerComponent().getRouter()
					.navTo("menu", !Device.system.phone);
			}
		}
	});
});