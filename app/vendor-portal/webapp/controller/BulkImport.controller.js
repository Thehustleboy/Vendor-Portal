sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, UIComponent, MessageToast, MessageBox) {
    "use strict";
    return Controller.extend("msu.vendorportal.controller.BulkImport", {
        onNavBack: function () {
            UIComponent.getRouterFor(this).navTo("tools");
        },
        onDownloadTemplate: function () {
            MessageToast.show("Template downloaded");
        },
        onImport: function () {
            MessageBox.success("Import started");
        }
    });
});