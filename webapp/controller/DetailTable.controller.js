sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/ui/model/json/JSONModel",
   "sap/ui/model/Filter",
   "sap/ui/model/FilterOperator",
   "sap/ui/model/resource/ResourceModel"

], function (Controller, JSONModel, Filter, FilterOperator, ResourceModel) {
   
   "use strict";

   var file;

   return Controller.extend("sap.ui.iba.practic.controller.DetailTable", {
   	
      onInit : function () {
   
         var oModel = new JSONModel(jQuery.sap.getModulePath("sap.ui.iba.practic.mock", "/Phones.json"));
         
         this.getView().setModel(oModel, "phone");


         this.getOwnerComponent().getRouter().getRoute("detail").attachPatternMatched(this._onRouteMatched, this);

         var oViewModel = new JSONModel({
				currency: "BYN"
			});
         
         this.getView().setModel(oViewModel, "view");         
         
		},

      _onRouteMatched: function(oEvent) {
            
         this.getView().bindElement({
            path: "/Phones/" + oEvent.getParameter("arguments").selectedPhone,
            model: "phone"
         });         
         file = oEvent.getParameter("arguments").lang;
         var i18nModel = new ResourceModel({
            bundleName : "sap.ui.iba.practic.i18n.i18n_" + file
         });
         this.getView().setModel(i18nModel, "i18n");
      },

      getI18N: function(oEvent) {

         file = this.getView().byId("language").getProperty("selectedKey");
         var i18nModel = new ResourceModel({
            bundleName : "sap.ui.iba.practic.i18n.i18n_" + file
         });
         this.getView().setModel(i18nModel, "i18n");
      },

      onNavBack: function (oEvent) {
         
         this.getOwnerComponent().getRouter().navTo("table", {lang : file}, true);         
      }     
   });
});