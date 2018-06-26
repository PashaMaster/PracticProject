sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/ui/Device",
		"sap/ui/model/resource/ResourceModel"

], function(Controller, Device, ResourceModel) {
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
					.navTo("table");				
				
		},

		goToInfo: function(oEvent) {
			
			this.getOwnerComponent().getRouter()
					.navTo("info");								
		},

		goToContact: function(oEvent) {
			
			this.getOwnerComponent().getRouter()
					.navTo("contact");								
		},
		goToGalary: function(oEvent) {
			
			this.getOwnerComponent().getRouter()
					.navTo("galary");								
		},

		getI18N: function(oEvent) {

	        var file = this.getView().byId("language").getProperty("selectedKey");
	        var i18nModel = new ResourceModel({
	           bundleName : "sap.ui.iba.practic.i18n.i18n_" + file
	        });
	        this.getOwnerComponent().setModel(i18nModel, "i18n");
      	}

	});

});