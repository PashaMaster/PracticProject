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

   var upPhone;
   var index;
   var sPath;

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
      
      onDetailUpdate : function (oEvent) {
         
         var sPath = oEvent.getSource().getBindingContext("phone").sPath;
         //this.getOwnerComponent().updateDialog.onOpenDialog(this.getView(), sPath, this.getOwnerComponent(), true);
         this.setState(true);
         this.onOpenDialog(sPath);
         
      },      

      onUpdate : function (oEvent) {
         
         var sPath = oEvent.getSource().getBindingContext("phone").sPath;
         this.setState(false);
         this.onOpenDialog(sPath);
      },

      onDelete: function (oEvent) {
        
         var sPath=oEvent.getSource().getParent().getBindingContext("phone").sPath;                  
         this.onDeleteAndCloseDialog(sPath);
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
      },

      _getDialog : function () {
         
         if (!this._oDialog) {
         
            this._oDialog = sap.ui.xmlfragment("sap.ui.iba.practic.view.UpdateDialog", this);
         }
         return this._oDialog;
      },

      onOpenDialog : function (sPath) {
         
         this.sPath = sPath;
         this.openDialog();
         upPhone = this.getView().getModel("phone").getProperty(sPath);
         this.getView().setModel(new JSONModel(this.getView().getModel("phone").getProperty(sPath)), "upPhone");
         index = sPath.split('/');
      },

      openDialog : function () {
         
         var oDialog = this._getDialog();
         this.getView().addDependent(oDialog);
         oDialog.open();   
      },    

      setState : function (state) {

         var state = new JSONModel({
             active : state
         });
         this.getOwnerComponent().setModel(state, "state");
       },            

      onButtonGreen : function () {

         if (this.getOwnerComponent().getModel("state").getData().active) {
            this.setState(false);
         }
         else {
            this.onUpdateAndCloseDialog();   
         }
      },      

      onButtonRed : function () {

         if (this.getOwnerComponent().getModel("state").getData().active) {
            
            this.onDeleteAndCloseDialog(this.sPath)
         }
         else {
            this.setState(true);
         }
      },

      onUpdateAndCloseDialog : function() {
         
         var oModel = this.getOwnerComponent().getModel("phone");
         var aPhone = oModel.getProperty("/Phones");
         var phone = this.getView().getModel("upPhone");
         var updatedPhone = {
               ID : phone.getProperty("/ID"),
               Mark: phone.getProperty("/Mark"),
               Model : phone.getProperty("/Model"),
               Operating_system : phone.getProperty("/Operating_system"),
               Version : phone.getProperty("/Version"),
               Colors : phone.getProperty("/Colors"),
               Price: phone.getProperty("/Price")   
            };
         oModel.setProperty("/Phones/"+index[2], updatedPhone);
         this.onCloseDialog();
      },

      onCloseDialog : function () {

         this._getDialog().close();          
         this.setState(true);
      },

      onDeleteAndCloseDialog : function(sPath) {
         
         var oModel = this.getOwnerComponent().getModel("phone");
         var aPhone = oModel.getProperty("/Phones");
         
         var index = sPath.split('/');
         aPhone.splice(index[2], 1);

         var i18n = this.getView().getModel("i18n");

         var stateClose=true;
         var dialog = new Dialog({
            title: i18n.getProperty("delete"),
            type: 'Message',
            state: 'Warning',
            content: new Text({
               text: i18n.getProperty("messange")
            }),
            beginButton: new Button({
               type: 'Accept',
               text: i18n.getProperty("okDelete"),
               press: function () {
                  oModel.setProperty("/Phones", aPhone);
                  this.onCloseDialog();
                  dialog.close();
               }.bind(this)
            }),
            endButton: new Button({
               type: 'Reject',
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
      }
   });
});