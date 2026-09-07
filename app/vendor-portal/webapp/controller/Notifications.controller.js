sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast"
], function (Controller, UIComponent, MessageToast) {
    "use strict";
    return Controller.extend("msu.vendorportal.controller.Notifications", {
        onNavBack: function () {
            UIComponent.getRouterFor(this).navTo("tools");
        },
        onSave: function () {
            MessageToast.show("Preferences saved");
        }
    });
});