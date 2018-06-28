sap.ui.define([
   "sap/ui/core/UIComponent",
   "sap/ui/model/json/JSONModel",
   "sap/ui/model/resource/ResourceModel",
   "sap/ui/iba/practic/controller/CreateDialog",
   "sap/ui/Device"

], function (UIComponent, JSONModel, ResourceModel, CreateDialog, Device) {
   
   "use strict";

   return UIComponent.extend("sap.ui.iba.practic.Component", {
      
      metadata : {
		   manifest: "json"
	   },
      
      init : function () {
         
         UIComponent.prototype.init.apply(this, arguments);
         
         var state = new JSONModel({
             active : true
         });

         this.setModel(state, "state");         

         var i18nModel = new ResourceModel({
            bundleName : "sap.ui.iba.practic.i18n.i18n"
         });

         this.setModel(i18nModel, "i18n");

         var oModel = new JSONModel(jQuery.sap.getModulePath("sap.ui.iba.practic.mock", "/Phones.json"));
         
         var langModel = new JSONModel({
            active: "ru"
         });
         this.setModel(langModel, "lang");  

         this.setModel(oModel, "phone");

         this.createDialog = new CreateDialog();
         
         this.getRouter().initialize();

         this.getRouter().attachTitleChanged(function(oEvent){
            document.title = oEvent.getParameter("title");
         });
      },
      
      createDeviceModel : function () {
         var oModel = new JSONModel(Device);
         oModel.setDefaultBindingMode("OneWay");
         return oModel;
      },
   });
});