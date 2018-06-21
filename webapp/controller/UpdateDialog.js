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

		onOpenDialog : function (oView) {
			var oDialog = this._getDialog();
			
			oView.addDependent(oDialog);
			oDialog.open();			
		},

		onCloseDialog : function () {
			this._getDialog().close();
		}
	});
});