sap.ui.define([
	"sap/ui/base/Object",
   	"sap/ui/model/json/JSONModel"
], function (Object, JSONModel) {
	
	"use strict";

	var newPhone;
	var thisView;
	var thisOwner;

	return Object.extend("sap.ui.iba.practic.controller.CreateDialog", {
		
		_getDialog : function () {
			
			if (!this._oDialog) {
			
				this._oDialog = sap.ui.xmlfragment("sap.ui.iba.practic.view.CreateDialog", this);
			}
			return this._oDialog;
		},
		
		onOpenDialog : function (oView, oOwner) {
			var oDialog = this._getDialog();
			
			oView.addDependent(oDialog);
			
			thisView = oView;
			thisOwner = oOwner;
			
			newPhone = new JSONModel({
   			   ID : 0,
               Mark: null,
               Model : null,
               Operating_system : null,
               Version : null,
               Colors : null,
               Price: null   
   			});

   			oView.setModel(newPhone, "newPhone");

			oDialog.open();		

		},

		onCloseDialogOk : function () {

			var oModel = thisOwner.getModel("phone");
         
           	var aPhone = oModel.getProperty("/Phones");
         	
         	var createdPhone = {
   			   ID : 0,
               Mark: newPhone.getProperty("/Mark"),
               Model : newPhone.getProperty("/Model"),
               Operating_system : newPhone.getProperty("/Operating_system"),
               Version : newPhone.getProperty("/Version"),
               Colors : newPhone.getProperty("/Colors"),
               Price: newPhone.getProperty("/Price")   
   			};

         	aPhone.push(createdPhone);

         	oModel.setProperty("/Phones", aPhone);

			this._getDialog().close();
		},

		onCloseDialogCancel : function () {

			this._getDialog().close();
		}
	});
});