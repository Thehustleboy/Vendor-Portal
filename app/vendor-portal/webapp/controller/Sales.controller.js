sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("msu.vendorportal.controller.Sales", {

        onInit: function () {},

        onExport: function () {
            MessageToast.show("Exporting sales report...");
        }
    });
});