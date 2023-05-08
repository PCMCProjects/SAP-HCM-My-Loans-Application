sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/demoB62Demo/model/models",
	"sap/ui/core/routing/History"
], function(UIComponent, Device, models, History) {
	"use strict";

	return UIComponent.extend("com.demoB62Demo.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			this.getRouter().initialize();

			//read all products data into a json Model
			var oModel = this.getModel();
			var oPrdModel = this.getModel("prdModel");
			oModel.read("/ProductSet", {
				success: function(data) {
					oPrdModel.setData(data);
				},
				error: function(error) {

				}
			});

		},
		onNavBack: function() {
			var sPreviousHash = History.getInstance().getPreviousHash();

			if (sPreviousHash !== undefined) {
				history.go(-1);
			} else {
				this.getRouter().navTo("view1route", {}, true);
			}

		}
	});
});