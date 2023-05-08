sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/Sorter",
	"com/demoB62Demo/model/formatter",
	"sap/ui/export/Spreadsheet"
], function(Controller, Filter, Sorter, formatter, Spreadsheet) {
	"use strict";

	return Controller.extend("com.demoB62Demo.controller.View1", {
		f: formatter,
		onPress: function() {
			this.getOwnerComponent().getRouter().navTo("view3route");
		},
		onReset: function() {
			this.getView().byId("idIpPrdId").setValue("");
			this.getView().byId("idIpPrdName").setValue("");
			this.getView().byId("idIpStatus").setValue("");
			this.getView().byId("idTab").getBinding("items").filter([]);
		},
		onToggleSort: function(oEvent) {
			var btn = oEvent.getSource().getIcon().split("sort-")[1];
			var sortField = this.getView().byId("idCBSort").getValue();
			var oSorter;
			if (btn === "ascending") {
				oSorter = new Sorter(sortField, false);
			} else {
				oSorter = new Sorter(sortField, true);
			}

			this.getView().byId("idTab").getBinding("items").sort(oSorter);

		},

		onGo: function() {
			var prdId = this.getView().byId("idIpPrdId").getValue();
			var prdName = this.getView().byId("idIpPrdName").getValue();
			var status = this.getView().byId("idIpStatus").getValue();

			var aFilters = [];
			if (prdId !== "") {
				aFilters.push(new Filter("Prdid", "EQ", prdId));
			}
			if (prdName !== "") {
				aFilters.push(new Filter("Prdname", "EQ", prdName));
			}
			if (status !== "") {
				aFilters.push(new Filter("Status", "EQ", status));
			}

			var oSorter = new Sorter("Prdprice", false);

			this.getView().byId("idTab").getBinding("items").filter(aFilters).sort(oSorter);
		},
		onPressRowFromF4Help: function(oEvent) {
			var prdId = oEvent.getSource().getBindingContext().getProperty("Prdid");
			this.getView().byId("idIpPrdId").setValue(prdId);
			this.dialog.close();
		},
		onClose: function() {
			this.dialog.close();
		},
		onPressF4Help: function() {
			if (!this.dialog) {
				this.dialog = sap.ui.xmlfragment(this.getView().getId(), "com.demoB62Demo.view.PrdIdF4Help", this);
				this.getView().addDependent(this.dialog);
			}
			this.dialog.open();
		},
		onSelItemMCB: function(oEvent) {
			var aAllItems = this.getView().byId("idMcb").getItems();
			var totalItemsCount = aAllItems.length;
			var selItemsCount = this.getView().byId("idMcb").getSelectedItems().length;
			var item = oEvent.getParameter("changedItem").getText();
			var selectedOrNot = oEvent.getParameter("selected");

			if (item === "Select All" && selectedOrNot === true) {
				//make all other items selected 
				this.getView().byId("idMcb").setSelectedItems(aAllItems);
			} else if (item === "Select All" && selectedOrNot === false) {
				//make all other items deselected
				this.getView().byId("idMcb").removeAllSelectedItems();
			} else if (selectedOrNot === false) {
				this.getView().byId("idMcb").removeSelectedItem(aAllItems[0]);
			} else if (selectedOrNot === true && selItemsCount === totalItemsCount - 1) {
				this.getView().byId("idMcb").addSelectedItem(aAllItems[0]);
			}
		},
		onExportToXL: function() {
			var aCols, oRowBinding, oSettings, oSheet;
			oRowBinding = this.getView().byId('idTab').getBinding('items');
			// place your table columns and odata properties
			aCols = [{
				label: 'Product ID',
				property: 'Prdid'
			}, {
				label: 'Product Name',
				property: 'Prdname'
			}, {
				label: 'Product Description',
				property: 'Prddesc'
			}, {
				label: 'Product Price',
				property: 'Prdprice'
			}, {
				label: 'Currency Code',
				property: 'Currcode'
			}, {
				label: 'Product Status',
				property: 'Status'
			}];
			oSettings = {
				workbook: {
					columns: aCols
				},
				dataSource: oRowBinding,
				fileName: 'Products.xlsx',
				worker: true
			};

			oSheet = new Spreadsheet(oSettings);
			oSheet.build().finally(function() {
				oSheet.destroy();
			});
		},
		onExportToPDF: function() {
			var colms = ["Product Id", "Product Name", "Product Desc", "Product Price", "CurrencyCode", "Product Status"];
			var aRows = this.getOwnerComponent().getModel("prdModel").getData().results;
			for (var i = 0; i < aRows.length; i++) {
				aRows[i] = [
					aRows[i].Prdid,
					aRows[i].Prdname,
					aRows[i].Prddesc,
					aRows[i].Prdprice,
					aRows[i].Currcode,
					aRows[i].Status
				];
			}
			var pdf = new jsPDF('p', 'pt'); // Add libraries to lib folder and define in manifest.json
			pdf.text(40, 30, 'List of products');
			pdf.autoTable(colms, aRows);
			pdf.save("My Products.pdf");
		}
	});
});