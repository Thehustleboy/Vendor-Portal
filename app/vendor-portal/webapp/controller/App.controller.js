sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast",
    "sap/m/Dialog",
    "sap/m/VBox",
    "sap/m/HBox",
    "sap/m/Title",
    "sap/m/Text",
    "sap/m/Label",
    "sap/m/Input",
    "sap/m/Button",
    "sap/m/Avatar",
    "sap/m/MessageStrip"
], function (
    Controller,
    UIComponent,
    MessageToast,
    Dialog,
    VBox,
    HBox,
    Title,
    Text,
    Label,
    Input,
    Button,
    Avatar,
    MessageStrip
) {
    "use strict";

    return Controller.extend("msu.vendorportal.controller.App", {

        onInit: function () {

            const oRouter = UIComponent.getRouterFor(this);

            oRouter.attachRouteMatched(
                this._onRouteMatched,
                this
            );

            /*
             * Open login after application initialization.
             */
            setTimeout(function () {
                this._openLoginDialog();
            }.bind(this), 0);
        },


        /* =========================================================
           ROUTE MATCH
           ========================================================= */

        _onRouteMatched: function (oEvent) {

            const sName =
                oEvent.getParameter("name");

            const oNavigationList =
                this.byId("navigationList");

            if (!oNavigationList) {
                return;
            }

            const map = {
                home: "home",

                stock: "stock",
                stockDetail: "stock",

                sales: "sales",

                docs: "docs",
                docDetail: "docs",
                createASN: "docs",

                tools: "tools",

                replenish: "tools",
                barcode: "tools",
                bulkImport: "tools",
                reports: "tools",
                notifications: "tools",
                settings: "tools"
            };

            oNavigationList.setSelectedKey(
                map[sName] || "home"
            );
        },


        /* =========================================================
           SIDE NAV TOGGLE
           ========================================================= */

        onSideNavToggle: function () {

            const oTP =
                this.byId("toolPage");

            if (!oTP) {
                return;
            }

            oTP.setSideExpanded(
                !oTP.getSideExpanded()
            );
        },


        /* =========================================================
           SIDE NAVIGATION
           ========================================================= */

        onSideNavItemSelect: function (oEvent) {

            const oItem =
                oEvent.getParameter("item");

            if (!oItem) {
                return;
            }

            const sKey =
                oItem.getKey();

            UIComponent
                .getRouterFor(this)
                .navTo(sKey);
        },


        /* =========================================================
           FULL SCREEN LOGIN
           ========================================================= */

        _openLoginDialog: function () {

            if (this._oLoginDialog) {

                this._oLoginDialog.open();
                return;
            }


            /*
             * Logo
             */
            const oLogo = new Avatar({
                initials: "MSU",
                displayShape: "Circle",
                displaySize: "Custom",
                customDisplaySize: "72px",
                customFontSize: "20px",
                backgroundColor: "Accent6"
            }).addStyleClass("msuLoginLogo");


            /*
             * User ID
             */
            this._oUserInput = new Input({
                placeholder: "Enter your User ID",
                width: "100%"
            }).addStyleClass("msuLoginInput");


            /*
             * Password
             */
            this._oPasswordInput = new Input({
                placeholder: "Enter your password",
                type: "Password",
                width: "100%"
            }).addStyleClass("msuLoginInput");


            /*
             * Error message
             */
            this._oLoginError = new MessageStrip({
                text: "",
                type: "Error",
                showIcon: true,
                visible: false
            }).addStyleClass(
                "sapUiSmallMarginTop"
            );


            /*
             * Login button
             */
            const oLoginButton = new Button({
                text: "Sign In",
                type: "Emphasized",
                width: "100%",
                press: this._handleLogin.bind(this)
            }).addStyleClass(
                "msuLoginButton sapUiMediumMarginTop"
            );


            /*
             * Press Enter from User ID
             */
            this._oUserInput.attachSubmit(
                this._handleLogin.bind(this)
            );


            /*
             * Press Enter from Password
             */
            this._oPasswordInput.attachSubmit(
                this._handleLogin.bind(this)
            );


            /*
             * Login card
             */
            const oLoginCard = new VBox({

                width: "430px",

                items: [

                    new VBox({

                        alignItems: "Center",

                        items: [

                            oLogo,

                            new Title({
                                text: "MSU Vendor Portal",
                                level: "H1"
                            }).addStyleClass(
                                "msuLoginTitle"
                            ),

                            new Text({
                                text:
                                    "Sign in to access your vendor account",
                                textAlign: "Center"
                            }).addStyleClass(
                                "msuLoginSubtitle"
                            )

                        ]

                    }).addStyleClass(
                        "msuLoginHeader"
                    ),


                    /*
                     * USER ID
                     */
                    new VBox({

                        items: [

                            new Label({
                                text: "USER ID"
                            }).addStyleClass(
                                "msuLoginLabel"
                            ),

                            this._oUserInput

                        ]

                    }).addStyleClass(
                        "sapUiMediumMarginTop"
                    ),


                    /*
                     * PASSWORD
                     */
                    new VBox({

                        items: [

                            new Label({
                                text: "PASSWORD"
                            }).addStyleClass(
                                "msuLoginLabel"
                            ),

                            this._oPasswordInput

                        ]

                    }).addStyleClass(
                        "sapUiSmallMarginTop"
                    ),


                    /*
                     * ERROR
                     */
                    this._oLoginError,


                    /*
                     * BUTTON
                     */
                    oLoginButton,


                    /*
                     * DEMO CREDENTIALS
                     */
                    new VBox({

                        items: [

                            new Text({
                                text:
                                    "Demo Credentials"
                            }).addStyleClass(
                                "msuDemoTitle"
                            ),

                            new Text({
                                text:
                                    "User ID: vendor001"
                            }).addStyleClass(
                                "msuDemoText"
                            ),

                            new Text({
                                text:
                                    "Password: 1234"
                            }).addStyleClass(
                                "msuDemoText"
                            )

                        ]

                    }).addStyleClass(
                        "msuDemoLoginBox sapUiMediumMarginTop"
                    ),


                    /*
                     * FOOTER
                     */
                    new Text({
                        text:
                            "© 2026 MSU Vendor Portal",
                        textAlign: "Center",
                        width: "100%"
                    }).addStyleClass(
                        "msuLoginFooter sapUiMediumMarginTop"
                    )

                ]

            }).addStyleClass(
                "msuLoginCard"
            );


            /*
             * Full screen wrapper
             */
            const oWrapper = new HBox({

                width: "100%",
                height: "100%",

                alignItems: "Center",
                justifyContent: "Center",

                items: [
                    oLoginCard
                ]

            }).addStyleClass(
                "msuLoginWrapper"
            );


            /*
             * Dialog
             */
            this._oLoginDialog = new Dialog({

                stretch: true,

                showHeader: false,

                horizontalScrolling: false,

                verticalScrolling: false,

                escapeHandler: function (oPromise) {

                    /*
                     * Prevent ESC from closing login
                     */
                    oPromise.reject();
                },

                content: [
                    oWrapper
                ]

            }).addStyleClass(
                "msuLoginDialog"
            );


            /*
             * Register dialog with view
             */
            this.getView().addDependent(
                this._oLoginDialog
            );


            this._oLoginDialog.open();


            setTimeout(function () {

                if (this._oUserInput) {
                    this._oUserInput.focus();
                }

            }.bind(this), 300);
        },


        /* =========================================================
           LOGIN CHECK
           ========================================================= */

        _handleLogin: function () {

            const sUserId =
                (
                    this._oUserInput.getValue() || ""
                ).trim();


            const sPassword =
                this._oPasswordInput.getValue() || "";


            this._oLoginError.setVisible(false);


            if (!sUserId) {

                this._oLoginError.setText(
                    "Please enter User ID"
                );

                this._oLoginError.setVisible(true);

                this._oUserInput.focus();

                return;
            }


            if (!sPassword) {

                this._oLoginError.setText(
                    "Please enter password"
                );

                this._oLoginError.setVisible(true);

                this._oPasswordInput.focus();

                return;
            }


            /*
             * DEMO LOGIN
             */
            if (
                sUserId === "vendor001" &&
                sPassword === "1234"
            ) {

                this._oPasswordInput.setValue("");

                this._oLoginError.setVisible(false);


                /*
                 * Close login
                 */
                this._oLoginDialog.close();


                MessageToast.show(
                    "Login successful"
                );


                /*
                 * Go Home
                 */
                UIComponent
                    .getRouterFor(this)
                    .navTo(
                        "home",
                        {},
                        true
                    );

                return;
            }


            this._oLoginError.setText(
                "Invalid User ID or password"
            );

            this._oLoginError.setVisible(true);

            this._oPasswordInput.setValue("");

            this._oPasswordInput.focus();
        },


        /* =========================================================
           LOGOUT
           ========================================================= */

        onLogout: function () {

            if (this._oUserInput) {
                this._oUserInput.setValue("");
            }

            if (this._oPasswordInput) {
                this._oPasswordInput.setValue("");
            }

            if (this._oLoginError) {

                this._oLoginError.setText("");

                this._oLoginError.setVisible(false);
            }


            MessageToast.show(
                "Logged out"
            );


            UIComponent
                .getRouterFor(this)
                .navTo(
                    "home",
                    {},
                    true
                );


            this._openLoginDialog();
        },


        /* =========================================================
           CLEANUP
           ========================================================= */

        onExit: function () {

            if (this._oLoginDialog) {

                this._oLoginDialog.destroy();

                this._oLoginDialog = null;
            }
        }

    });

});