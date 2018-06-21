sap.ui.define([
	"sap/ui/base/Object",
   	"sap/ui/model/json/JSONModel"
], function (Object, JSONModel) {
	
	"use strict";
	var upPhone;
	var thisView;
	var index;
	return Object.extend("sap.ui.iba.practic.controller.UpdateDialog", {
		_getDialog : function () {
			
			if (!this._oDialog) {
			
				this._oDialog = sap.ui.xmlfragment("sap.ui.iba.practic.view.UpdateDialog", this);
			}
			return this._oDialog;
		},

		onOpenDialog : function (oView, sPath) {
			var oDialog = this._getDialog();
			
			oView.addDependent(oDialog);
			
			upPhone = oView.getModel("phone").getProperty(sPath);

			thisView = oView; 
			
			oView.setModel(new JSONModel(oView.getModel("phone").getProperty(sPath)), "upPhone");
			
			oDialog.open();	

			index = sPath.split('/');
			
		},

		onUpdateAndCloseDialog : function() {
			var oModel = thisView.getModel("phone");

			var aPhone = oModel.getProperty("/Phones");

			var phone = thisView.getModel("upPhone");

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

			this._getDialog().close();
		},

		onCloseDialog : function () {

			this._getDialog().close();	
		}
	});
});