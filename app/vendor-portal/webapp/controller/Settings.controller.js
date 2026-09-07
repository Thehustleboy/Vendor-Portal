sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, UIComponent, MessageToast, MessageBox) {
    "use strict";
    return Controller.extend("msu.vendorportal.controller.Settings", {
        onNavBack: function () {
            UIComponent.getRouterFor(this).navTo("tools");
        },
        onChangePassword: function () {
            MessageBox.information("Password change dialog");
        },
        onSave: function () {
            MessageToast.show("Settings saved");
        }
    });
});