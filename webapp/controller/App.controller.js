sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/ui/model/json/JSONModel",
   "sap/ui/model/Filter",
   "sap/ui/model/FilterOperator"      
], function (Controller, JSONModel, Filter, FilterOperator) {
   
   "use strict";

   return Controller.extend("sap.ui.iba.practic.controller.App", {
   	
      onInit : function () {
			try {
            var oModel = new JSONModel(jQuery.sap.getModulePath("sap.ui.iba.practic.mock", "/Phones.json"));
            
            this.getView().setModel(oModel, "phone");
          
            var oViewModel = new JSONModel({
   				currency: "BYN"
   			});
            this.getView().setModel(oViewModel, "view");
         }
         catch (e) {
            console.log(e);
         }
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
      },

      onUpdate : function (oEvent) {
         
         var sPath=oEvent.getSource().getParent().getBindingContext("phone").sPath;

         this.getOwnerComponent().updateDialog.onOpenDialog(this.getView(), sPath);
         
      },
      
      onDelete : function (oEvent) {
         
         var oModel = this.getView().getModel("phone");

         var aPhone = oModel.getProperty("/Phones");

         var sPath=oEvent.getSource().getParent().getBindingContext("phone").sPath;
         
         var index = sPath.split('/');

         aPhone.splice(index[2], 1);
         oModel.setProperty("/Phones", aPhone);
      },

      onCreate : function (oEvent) {

         this.getOwnerComponent().createDialog.onOpenDialog(this.getView());
      }
   });
});