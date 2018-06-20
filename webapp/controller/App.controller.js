sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/ui/model/json/JSONModel",
   "sap/ui/model/Filter",
   "sap/ui/model/FilterOperator"      
], function (Controller, JSONModel, Filter, FilterOperator) {
   "use strict";
   return Controller.extend("sap.ui.iba.practic.controller.App", {
   		onInit : function () {
			var oViewModel = new JSONModel({
				currency: "BYN"
			});
			this.getView().setModel(oViewModel, "view");
		},
      onFilterPhones : function (oEvent) {

         var aFilter = [];
         var sQuery = oEvent.getParameter("query");
         if (sQuery) {
            aFilter.push(new Filter("Mark", FilterOperator.Contains, sQuery));
         }

         var oTable = this.getView().byId("idPhoneTable");
         var oBinding = oTable.getBinding("items");
         oBinding.filter(aFilter);
      }
   	
   });
});