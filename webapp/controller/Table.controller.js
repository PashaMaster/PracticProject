sap.ui.define([
   "sap/m/Button",
   "sap/m/Dialog",
   "sap/m/Text",
   "sap/ui/core/mvc/Controller",
   "sap/ui/model/json/JSONModel",
   "sap/ui/model/Filter",
   "sap/ui/model/FilterOperator",
   "sap/ui/model/resource/ResourceModel"

], function (Button, Dialog, Text, Controller, JSONModel, Filter, FilterOperator, ResourceModel) {
   
   "use strict";

   return Controller.extend("sap.ui.iba.practic.controller.Table", {
   	
      onInit : function () {
         
          
         this.getOwnerComponent().getRouter().getRoute("table").attachPatternMatched(this._onRouteMatched, this);

         var oViewModel = new JSONModel({
				currency: "BYN"
			});
         this.getView().setModel(oViewModel, "view");  
      },

      _onRouteMatched: function(oEvent) {
         
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
         this.getOwnerComponent().updateDialog.onOpenDialog(this.getView(), sPath, this.getOwnerComponent());
         
      },

      onDelete: function (oEvent) {
        
         var oModel = this.getOwnerComponent().getModel("phone");
         var aPhone = oModel.getProperty("/Phones");
         var sPath=oEvent.getSource().getParent().getBindingContext("phone").sPath;                  
         var index = sPath.split('/');
         aPhone.splice(index[2], 1);

         var i18n = this.getView().getModel("i18n");

         var dialog = new Dialog({
            title: i18n.getProperty("delete"),
            type: 'Message',
            state: 'Warning',
            content: new Text({
               text: i18n.getProperty("messange")
            }),
            beginButton: new Button({
               type: 'Accept',
               text: i18n.getProperty("ok"),
               press: function () {

                  oModel.setProperty("/Phones", aPhone);
                  dialog.close();
               }
            }),
            endButton: new Button({
               type: 'Accept',
               text: i18n.getProperty("cancel"),
               press: function () {
                  dialog.close();
               }
            }),
            afterClose: function() {
               dialog.destroy();
            }
         });

         dialog.open();
      },
     
      onCreate : function (oEvent) {

         this.getOwnerComponent().createDialog.onOpenDialog(this.getView(), this.getOwnerComponent());
      },

      onSelected : function(oEvent) {

         var sPath = oEvent.getSource().getBindingContext("phone").sPath;
         var index = sPath.split('/');

         this.getOwnerComponent().getRouter()
               .navTo("detail", {selectedPhone : index[2]});           
      },

      getI18N: function(oEvent) {

         var file = this.getView().byId("language").getProperty("selectedKey");
         var oEventBus = sap.ui.getCore().getEventBus();
         oEventBus.publish("Table", "menuPage", {text: file});
      },
     
      onNavBack: function (oEvent) {

         this.getOwnerComponent().getRouter().navTo("menu", {}, true);
      }
   });
});