sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, UIComponent, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("msu.vendorportal.controller.Replenishment", {

        onInit: function () {
            var oLocal = this.getOwnerComponent().getModel("local");

            if (!oLocal.getProperty("/replenish")) {
                oLocal.setProperty("/replenish", {
                    store: "Vijayawada",
                    reason: "Stock running low",
                    note: "",
                    currentSku: {
                        name: "Kanjeevaram Saree",
                        qty: 10
                    },
                    skus: []
                });
            }
        },

        onNavBack: function () {
            UIComponent.getRouterFor(this).navTo("tools");
        },

        onToggleSpec: function () {
            MessageToast.show("Specification toggled");
        },

        onAddSku: function () {
            MessageToast.show("Add another SKU line");
        },

        onRemoveSku: function () {
            MessageBox.confirm("Remove this SKU?", {
                onClose: function (sAction) {
                    if (sAction === MessageBox.Action.OK) {
                        MessageToast.show("SKU removed");
                    }
                }
            });
        },

        onSubmitRequest: function () {
            var oLocal = this.getOwnerComponent().getModel("local");
            var oReplenish = oLocal.getProperty("/replenish");
            var that = this;

            MessageBox.success(
                "Replenishment request sent to buyer for " + oReplenish.store + ".",
                {
                    title: "Request Submitted",
                    onClose: function () {
                        UIComponent.getRouterFor(that).navTo("tools");
                    }
                }
            );
        }
    });
});