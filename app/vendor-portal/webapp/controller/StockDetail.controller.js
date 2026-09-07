sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast"
], function (
    Controller,
    UIComponent,
    MessageToast
) {
    "use strict";

    return Controller.extend(
        "msu.vendorportal.controller.StockDetail",
        {

            onInit: function () {

                const oRouter =
                    UIComponent.getRouterFor(this);


                oRouter
                    .getRoute("stockDetail")
                    .attachPatternMatched(
                        this._onRouteMatched,
                        this
                    );

            },


            /* =================================================
               LOAD CLICKED PRODUCT
               ================================================= */

            _onRouteMatched: function (oEvent) {

                const oArguments =
                    oEvent.getParameter(
                        "arguments"
                    );


                const sId =
                    oArguments.id;


                const oModel =
                    this.getOwnerComponent()
                        .getModel("local");


                if (!oModel) {
                    return;
                }


                const aStockItems =
                    oModel.getProperty(
                        "/stockItems"
                    ) || [];


                const iIndex =
                    aStockItems.findIndex(
                        function (oItem) {

                            return (
                                String(oItem.id) ===
                                String(sId)
                            );

                        }
                    );


                if (iIndex === -1) {

                    MessageToast.show(
                        "Stock item not found"
                    );


                    UIComponent
                        .getRouterFor(this)
                        .navTo(
                            "stock"
                        );

                    return;
                }


                const sPath =
                    "/stockItems/" +
                    iIndex;


                const sImage =
                    oModel.getProperty(
                        sPath + "/image"
                    );


                oModel.setProperty(
                    sPath +
                    "/selectedImage",
                    sImage
                );


                this.getView()
                    .bindElement({
                        path: sPath,
                        model: "local"
                    });

            },


            /* =================================================
               THUMBNAIL CLICK
               ================================================= */

            onImagePress: function (oEvent) {

                const oImageContext =
                    oEvent
                        .getSource()
                        .getBindingContext(
                            "local"
                        );


                if (!oImageContext) {
                    return;
                }


                const sImageUrl =
                    oImageContext.getProperty(
                        "url"
                    );


                if (!sImageUrl) {
                    return;
                }


                const oProductContext =
                    this.getView()
                        .getBindingContext(
                            "local"
                        );


                if (!oProductContext) {
                    return;
                }


                const oModel =
                    this.getOwnerComponent()
                        .getModel("local");


                oModel.setProperty(
                    oProductContext.getPath() +
                    "/selectedImage",
                    sImageUrl
                );

            },


            /* =================================================
               BACK
               ================================================= */

            onBack: function () {

                UIComponent
                    .getRouterFor(this)
                    .navTo(
                        "stock"
                    );

            }

        }
    );

});