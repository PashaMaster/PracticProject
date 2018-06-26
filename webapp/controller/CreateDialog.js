sap.ui.define([
	"sap/ui/base/Object",
   	"sap/ui/model/json/JSONModel",
   	"sap/m/MessageBox",
	"sap/ui/core/Fragment"
], function (Object, JSONModel, MessageBox, Fragment) {
	
	"use strict";

	var newPhone;
	var thisView;
	var thisOwner;
	var aInputs;

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
			this.initInput();
   			oView.setModel(newPhone, "newPhone");
   			oDialog.open();		
		},

		initInput: function() {

			aInputs = [
				sap.ui.getCore().byId("markInput"),
				sap.ui.getCore().byId("modelInput"),
				sap.ui.getCore().byId("systemInput"),
				sap.ui.getCore().byId("versionInput"),
				sap.ui.getCore().byId("priceInput")
			];

			jQuery.each(aInputs, function (i, oInput) {
	
				var oBinding = oInput.getBinding("value");
				oInput.setValueState("None");
			});

		},

		onCloseDialogOk : function () {

			if (!this.checkField()){
		
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
			} else {
				MessageBox.error(
					thisView.getModel("i18n").getProperty("msgError"),
					{
						title: thisView.getModel("i18n").getProperty("error"),
						actions: sap.m.MessageBox.Action.OK
					});
			}			
		},

		onCloseDialogCancel : function () {

			this._getDialog().close();
		},

		checkField : function () {

			
			var bValidationError = false;


			jQuery.each(aInputs, function (i, oInput) {
				
				var oBinding = oInput.getBinding("value");
				
				if (oInput.getValue() === "" || oInput.getValue() === null) {
					oInput.setValueState("Error");
					bValidationError = true;
				}
				else {
					oInput.setValueState("Success");
				}
			});			
			return bValidationError
    	}		
	});
});