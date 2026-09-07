sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (
    Controller,
    UIComponent,
    MessageToast,
    Filter,
    FilterOperator
) {
    "use strict";

    return Controller.extend(
        "msu.vendorportal.controller.Stock",
        {

            onInit: function () {

                const oRouter =
                    UIComponent.getRouterFor(this);

                oRouter
                    .getRoute("stock")
                    .attachPatternMatched(
                        this._onRouteMatched,
                        this
                    );

            },


            /* =================================================
               ROUTE MATCH
               ================================================= */

            _onRouteMatched: function () {

                const oModel =
                    this.getOwnerComponent()
                        .getModel("local");

                if (!oModel) {
                    return;
                }


                let sStore =
                    oModel.getProperty(
                        "/selectedStore"
                    );


                if (!sStore) {

                    sStore = "All";

                    oModel.setProperty(
                        "/selectedStore",
                        "All"
                    );
                }


                setTimeout(
                    function () {

                        this._filterStockByStore(
                            sStore
                        );

                    }.bind(this),
                    0
                );

            },


            /* =================================================
               STORE CHANGE
               ================================================= */

            onStoreChange: function (oEvent) {

                const oSelectedItem =
                    oEvent.getParameter(
                        "item"
                    );

                if (!oSelectedItem) {
                    return;
                }


                const sStore =
                    oSelectedItem.getKey();


                const oModel =
                    this.getOwnerComponent()
                        .getModel("local");


                if (!oModel) {
                    return;
                }


                oModel.setProperty(
                    "/selectedStore",
                    sStore
                );


                this._filterStockByStore(
                    sStore
                );


                if (sStore === "All") {

                    MessageToast.show(
                        "Showing all stores"
                    );

                } else {

                    MessageToast.show(
                        "Showing stock for " +
                        sStore
                    );

                }

            },


            /* =================================================
               FILTER
               ================================================= */

            _filterStockByStore: function (
                sStore
            ) {

                const oGrid =
                    this.byId(
                        "stockGrid"
                    );


                if (!oGrid) {
                    return;
                }


                const oBinding =
                    oGrid.getBinding(
                        "content"
                    );


                if (!oBinding) {
                    return;
                }


                if (
                    !sStore ||
                    sStore === "All"
                ) {

                    oBinding.filter([]);

                    return;
                }


                const oFilter =
                    new Filter(
                        "store",
                        FilterOperator.EQ,
                        sStore
                    );


                oBinding.filter([
                    oFilter
                ]);

            },


            /* =================================================
               STOCK TILE CLICK
               ================================================= */

            onStockPress: function (oEvent) {

                const oSource =
                    oEvent.getSource();


                const oContext =
                    oSource.getBindingContext(
                        "local"
                    );


                if (!oContext) {

                    MessageToast.show(
                        "Unable to identify stock item"
                    );

                    return;
                }


                const sId =
                    oContext.getProperty(
                        "id"
                    );


                UIComponent
                    .getRouterFor(this)
                    .navTo(
                        "stockDetail",
                        {
                            id: sId
                        }
                    );

            }

        }
    );

});