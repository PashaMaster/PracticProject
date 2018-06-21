sap.ui.define([
	"sap/ui/base/Object",
   	"sap/ui/model/json/JSONModel"
], function (Object, JSONModel) {
	
	"use strict";

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
			
						
			oDialog.open();			
			

			console.log(oView.getModel("phone>").getPrope;

			var Path = new JSONModel ({
				path : sPath
			});

			oView.setModel(Path, "sPath");
		},

		onCloseDialog : function () {
			this._getDialog().close();
		}
	});
});