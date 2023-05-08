sap.ui.define([

], function() {
	"use strict";

	return {
		colorStatus: function(status) {
			if (status === "APPROVED") {
				return "Success";
			} else {
				return "Error";
			}
		}
	};
});