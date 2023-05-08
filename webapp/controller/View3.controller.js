sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.demoB62Demo.controller.View3", {
		onBack: function() {
			this.getOwnerComponent().onNavBack();
		}
	});

});