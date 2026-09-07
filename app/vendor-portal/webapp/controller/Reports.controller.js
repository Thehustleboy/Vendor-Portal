sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageBox"
], function (Controller, UIComponent, MessageBox) {
    "use strict";
    return Controller.extend("msu.vendorportal.controller.Reports", {
        onNavBack: function () {
            UIComponent.getRouterFor(this).navTo("tools");
        },
        onGenerate: function () {
            MessageBox.success("Report is being generated");
        }
    });
});