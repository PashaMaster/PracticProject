sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/ui/model/json/JSONModel",
   "sap/ui/model/Filter",
   "sap/ui/model/FilterOperator",
   "sap/ui/model/resource/ResourceModel"
], function (Controller, JSONModel, Filter, FilterOperator, ResourceModel) {
   
   "use strict";

   return Controller.extend("sap.ui.iba.practic.controller.App", {
   	
      onInit : function () {
         var oModel = new JSONModel(jQuery.sap.getModulePath("sap.ui.iba.practic.mock", "/Phones.json"));
         
         this.getView().setModel(oModel, "phone");
       
         var oViewModel = new JSONModel({
				currency: "BYN"
			});
         this.getView().setModel(oViewModel, "view");         
		},

      getI18N: function() {

         var file = this.getView().byId("language").getProperty("selectedKey");
         var i18nModel = new ResourceModel({
            bundleName : "sap.ui.iba.practic.i18n.i18n_" + file
         });
         this.getView().setModel(i18nModel, "i18n");
      },

      onFilterPhonesMark: function (oEvent) {

         var sQueryMark = oEvent.getParameter("value");
         var sQueryModel = this.getView().byId("filterModel").getProperty("value");         
         this._filterPhones(sQueryMark, sQueryModel);
      },

      onFilterPhonesModel : function (oEvent) {

         var sQueryModel = oEvent.getParameter("value");
         var sQueryMark = this.getView().byId("filterMark").getProperty("value");        
         this._filterPhones(sQueryMark, sQueryModel);
      },

      _filterPhones : function (sQueryMark, sQueryModel) {

         var aFilter = [];
         
         var oTable = this.getView().byId("idPhoneTable");
         var oBinding = oTable.getBinding("items");
         if (sQueryMark && sQueryModel) {
            aFilter.push(new Filter("Model", FilterOperator.Contains, sQueryModel));
            aFilter.push(new Filter("Mark", FilterOperator.Contains, sQueryMark));
            oBinding.filter(aFilter);
         }
         else {
            if (sQueryMark) {
               aFilter.push(new Filter("Mark", FilterOperator.Contains, sQueryMark));
               oBinding.filter(aFilter);
            }
            else {
               if (sQueryModel) {
                  aFilter.push(new Filter("Model", FilterOperator.Contains, sQueryModel));
                  oBinding.filter(aFilter);
               }      
               else {
                  oBinding.filter(aFilter);
               }
            }
         }
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
      },

      onSelected : function(oEvent) {

         var sPath=oEvent.getSource().getBindingContext("phone").sPath;
         var selectedPhone = this.getView().getModel("phone").getProperty(sPath);
         this.getView().setModel(new JSONModel(selectedPhone), "selectedPhone");
      }
   });
});