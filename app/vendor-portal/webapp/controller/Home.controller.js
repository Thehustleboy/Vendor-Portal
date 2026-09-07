sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast"
], function (Controller, UIComponent, MessageToast) {
    "use strict";

    return Controller.extend("msu.vendorportal.controller.Home", {

        onSync: function () {
            MessageToast.show("Syncing data...");
        },

        onOrderPress: function (oEvent) {
            const oCtx = oEvent.getSource().getBindingContext("local");
            const sId = oCtx.getProperty("id");
            UIComponent.getRouterFor(this).navTo("docDetail", { type: "PO", id: sId });
        }
    });
});