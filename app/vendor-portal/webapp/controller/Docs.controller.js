sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
], function (Controller, UIComponent) {
    "use strict";
    return Controller.extend("msu.vendorportal.controller.Docs", {
        onPOPress: function (oEvent) {
            const oCtx = oEvent.getSource().getBindingContext("local");
            UIComponent.getRouterFor(this).navTo("docDetail", { type: "PO", id: oCtx.getProperty("id") });
        },
        onASNPress: function (oEvent) {
            const oCtx = oEvent.getSource().getBindingContext("local");
            UIComponent.getRouterFor(this).navTo("docDetail", { type: "ASN", id: oCtx.getProperty("id") });
        },
        onTabSelect: function (oEvent) {}
    });
});