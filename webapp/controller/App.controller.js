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
         
         console.log(oEvent.getSource());
         

         this.getOwnerComponent().updateDialog.onOpenDialog(this.getView());
         
      },
      
      onDelete : function (oEvent) {
         
         var oModel = this.getView().getModel("phone");
         var aPhone = oModel.getProperty("/Phones");


         var createdPhone = {
               ID : 2,
               Mark: "Xiaomi",
               Model : "Redmi Note 5 4GB/64GB",
               Operating_system : "Android",
               Version : "Android 7.1 Nougat",
               Color : "Black",
               Price: 547.000     
            };




         var index = aPhone.indexOf("Redmi 5 Plus 3GB/32GB").Mark;

         console.log(index);
      },

      onCreate : function (oEvent) {

         this.getOwnerComponent().createDialog.onOpenDialog(this.getView());
      }
   });
});