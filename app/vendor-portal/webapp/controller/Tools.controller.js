sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast"
], function (Controller, UIComponent, MessageToast) {
    "use strict";

    return Controller.extend("msu.vendorportal.controller.Tools", {

        onInit: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.getRoute("tools").attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function () {
            var that = this;
            setTimeout(function () {
                that._attachClickHandlers();
            }, 200);
        },

        onAfterRendering: function () {
            var that = this;
            setTimeout(function () {
                that._attachClickHandlers();
            }, 100);
        },

        _attachClickHandlers: function () {
            var oView = this.getView();
            var oDom = oView.getDomRef();
            if (!oDom) {
                return;
            }

            var aCards = oView.findAggregatedObjects(true, function (oControl) {
                return oControl.hasStyleClass && oControl.hasStyleClass("msuToolCard");
            });

            var that = this;

            aCards.forEach(function (oCard) {
                var aCustomData = oCard.getCustomData();
                var sTool = null;

                for (var i = 0; i < aCustomData.length; i++) {
                    if (aCustomData[i].getKey() === "tool") {
                        sTool = aCustomData[i].getValue();
                        break;
                    }
                }

                if (!sTool) {
                    return;
                }

                var oCardDom = oCard.getDomRef();
                if (!oCardDom) {
                    return;
                }

                if (oCardDom.getAttribute("data-msu-bound") === "true") {
                    return;
                }
                oCardDom.setAttribute("data-msu-bound", "true");

                oCardDom.style.cursor = "pointer";

                oCardDom.addEventListener("click", function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    that._handleToolClick(sTool);
                });
            });
        },

        _handleToolClick: function (sTool) {
            var oRouter = UIComponent.getRouterFor(this);

            switch (sTool) {
                case "replenish":
                    oRouter.navTo("replenish");
                    break;
                case "barcode":
                    oRouter.navTo("barcode");
                    break;
                case "bulk":
                    oRouter.navTo("bulkImport");
                    break;
                case "reports":
                    oRouter.navTo("reports");
                    break;
                case "notifications":
                    oRouter.navTo("notifications");
                    break;
                case "settings":
                    oRouter.navTo("settings");
                    break;
                default:
                    console.warn("Unknown tool: " + sTool);
            }
        }
    });
});