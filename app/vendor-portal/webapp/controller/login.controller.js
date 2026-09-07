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
        "msu.vendorportal.controller.Login",
        {

            onInit: function () {

                const oModel =
                    this.getOwnerComponent()
                        .getModel("local");

                if (!oModel) {
                    return;
                }

                oModel.setProperty(
                    "/login/errorMessage",
                    ""
                );
            },


            onLogin: function () {

                const oModel =
                    this.getOwnerComponent()
                        .getModel("local");

                if (!oModel) {
                    return;
                }


                const sUserId =
                    (
                        oModel.getProperty(
                            "/login/userId"
                        ) || ""
                    ).trim();


                const sPassword =
                    oModel.getProperty(
                        "/login/password"
                    ) || "";


                oModel.setProperty(
                    "/login/errorMessage",
                    ""
                );


                if (!sUserId) {

                    oModel.setProperty(
                        "/login/errorMessage",
                        "Please enter User ID"
                    );

                    return;
                }


                if (!sPassword) {

                    oModel.setProperty(
                        "/login/errorMessage",
                        "Please enter password"
                    );

                    return;
                }


                /* ============================================= */
                /* MOCK LOGIN                                    */
                /* ============================================= */

                if (
                    sUserId === "vendor001" &&
                    sPassword === "1234"
                ) {

                    oModel.setProperty(
                        "/isLoggedIn",
                        true
                    );


                    oModel.setProperty(
                        "/loggedInUser",
                        {
                            userId: sUserId,
                            vendorId: "V001",
                            vendorName: "Kanchipuram Silk"
                        }
                    );


                    oModel.setProperty(
                        "/login/password",
                        ""
                    );


                    oModel.setProperty(
                        "/login/errorMessage",
                        ""
                    );


                    MessageToast.show(
                        "Login successful"
                    );


                    UIComponent
                        .getRouterFor(this)
                        .navTo(
                            "home",
                            {},
                            true
                        );

                    return;
                }


                oModel.setProperty(
                    "/login/errorMessage",
                    "Invalid User ID or password"
                );
            }

        }
    );

});