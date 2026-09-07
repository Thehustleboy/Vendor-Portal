sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
    "use strict";
    return Controller.extend("msu.vendorportal.controller.DocDetail", {
        onNavBack: function () { window.history.go(-1); }
    });
});