sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.demoB62Demo.controller.View2", {
		onBack: function() {
			this.getOwnerComponent().onNavBack();
		},
		onGoto3rdView: function() {
			this.getOwnerComponent().getRouter().navTo("view3route");
		}
	});

});