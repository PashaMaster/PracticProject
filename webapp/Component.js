sap.ui.define([
   "sap/ui/core/UIComponent",
   "sap/ui/model/json/JSONModel",
   "sap/ui/model/resource/ResourceModel",
   "sap/ui/iba/practic/controller/UpdateDialog",
   "sap/ui/iba/practic/controller/CreateDialog",
], function (UIComponent, JSONModel, ResourceModel, UpdateDialog, CreateDialog) {
   
   "use strict";
   
   return UIComponent.extend("sap.ui.iba.practic.Component", {
      
      metadata : {
		   manifest: "json"
	   },
      
      init : function () {
         
         UIComponent.prototype.init.apply(this, arguments);
         
         var i18nModel = new ResourceModel({
            bundleName : "sap.ui.iba.practic.i18n.i18n"
         });
         this.setModel(i18nModel, "i18n");

         this.updateDialog = new UpdateDialog();
         this.createDialog = new CreateDialog();
      }
   });
});