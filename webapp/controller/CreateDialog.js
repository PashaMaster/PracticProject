sap.ui.define([
	"sap/ui/base/Object",
   	"sap/ui/model/json/JSONModel"
], function (Object, JSONModel) {
	
	"use strict";

	var newPhone;
	var thisView;

	return Object.extend("sap.ui.iba.practic.controller.CreateDialog", {
		
		_getDialog : function () {
			
			if (!this._oDialog) {
			
				this._oDialog = sap.ui.xmlfragment("sap.ui.iba.practic.view.CreateDialog", this);
			}
			return this._oDialog;
		},
		onOpenDialog : function (oView) {
			var oDialog = this._getDialog();
			
			oView.addDependent(oDialog);
			
			thisView = oView;
			
			newPhone = new JSONModel({
   			   ID : 0,
               Mark: null,
               Model : null,
               Operating_system : null,
               Version : null,
               Color : null,
               Price: null   
   			});

   			oView.setModel(newPhone, "newPhone");

			oDialog.open();		

		},

		onCloseDialog : function () {

			var oModel = thisView.getModel("phone");
         
           	var aPhone = oModel.getProperty("/Phones");
         	
         	var createdPhone = {
   			   ID : 0,
               Mark: newPhone.getProperty("/Mark"),
               Model : newPhone.getProperty("/Model"),
               Operating_system : newPhone.getProperty("/Operating_system"),
               Version : newPhone.getProperty("/Version"),
               Color : newPhone.getProperty("/Color"),
               Price: newPhone.getProperty("/Price")   
   			};

         	aPhone.push(createdPhone);

         	oModel.setProperty("/Phones", aPhone);

			this._getDialog().close();
		}
	});
});