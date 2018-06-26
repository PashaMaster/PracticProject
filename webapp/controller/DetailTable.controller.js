sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/ui/model/json/JSONModel",
   "sap/ui/model/Filter",
   "sap/ui/model/FilterOperator",
   "sap/ui/model/resource/ResourceModel"

], function (Controller, JSONModel, Filter, FilterOperator, ResourceModel) {
   
   "use strict";

   return Controller.extend("sap.ui.iba.practic.controller.DetailTable", {
   	
      onInit : function () {
   
         var oModel = this.getOwnerComponent().getModel("phone");

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
      },

      getI18N: function(oEvent) {

         var file = this.getView().byId("language").getProperty("selectedKey");
         var oEventBus = sap.ui.getCore().getEventBus();
         oEventBus.publish("DetailTable", "menuPage", {text: file});
      },

      onNavBack: function (oEvent) {
         
         this.getOwnerComponent().getRouter().navTo("table", {}, true);         
      }     
   });
});