sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, UIComponent, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("msu.vendorportal.controller.BarcodeStudio", {

        // ============================================
        // INIT
        // ============================================
        onInit: function () {
            const oLocal = this.getOwnerComponent().getModel("local");
            
            if (!oLocal.getProperty("/barcode")) {
                oLocal.setProperty("/barcode", {
                    format: "QR",
                    formatName: "QR Code",
                    product: "Silk Saree",
                    quantity: 1,
                    code: "MSU-SAR-V001-1931-00001",
                    identifiers: {
                        colour: "Vermillion",
                        size: "L/XL",
                        designNo: "MSU-DN-6795",
                        shadeNo: "SH-824",
                        weight: "780g",
                        designer: "Ravi Kumar",
                        merchandiser: "Anita Bose",
                        condition: "New / Pristine"
                    }
                });
            }

            const oRouter = UIComponent.getRouterFor(this);
            oRouter.getRoute("barcode").attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function () {
            setTimeout(() => this._renderBarcode(), 500);
        },

        onAfterRendering: function () {
            setTimeout(() => this._renderBarcode(), 300);
        },

        // ============================================
        // NAVIGATION
        // ============================================
        onNavBack: function () {
            UIComponent.getRouterFor(this).navTo("tools");
        },

        // ============================================
        // FORMAT CHANGE
        // ============================================
        onFormatChange: function (oEvent) {
            const sKey = oEvent.getParameter("key");
            const oLocal = this.getOwnerComponent().getModel("local");
            
            const mFormatNames = {
                "QR":    "QR Code",
                "C128":  "Code 128",
                "EAN13": "EAN-13",
                "DM":    "Data Matrix"
            };
            
            oLocal.setProperty("/barcode/formatName", mFormatNames[sKey]);
            this._renderBarcode();
        },

        // ============================================
        // PRODUCT CHANGE
        // ============================================
        onProductChange: function () {
            const oLocal = this.getOwnerComponent().getModel("local");
            const sProduct = oLocal.getProperty("/barcode/product");
            const sPrefix = sProduct.substring(0, 3).toUpperCase().replace(" ", "");
            const sNewCode = "MSU-" + sPrefix + "-V001-" + 
                             Math.floor(Math.random() * 9999) + "-" + 
                             String(Math.floor(Math.random() * 99999)).padStart(5, '0');
            oLocal.setProperty("/barcode/code", sNewCode);
            this._renderBarcode();
        },

        // ============================================
        // GENERATE
        // ============================================
        onGenerate: function () {
            const oLocal = this.getOwnerComponent().getModel("local");
            const sProduct = oLocal.getProperty("/barcode/product") || "SAR";
            const sPrefix = sProduct.substring(0, 3).toUpperCase().replace(" ", "");
            
            const sNewCode = "MSU-" + sPrefix + "-V001-" + 
                             Math.floor(Math.random() * 9999) + "-" + 
                             String(Math.floor(Math.random() * 99999)).padStart(5, '0');
            
            oLocal.setProperty("/barcode/code", sNewCode);
            this._renderBarcode();
            MessageToast.show("Generated: " + sNewCode);
        },

        // ============================================
        // CORE RENDER FUNCTION
        // ============================================
        _renderBarcode: function () {
            const oLocal = this.getOwnerComponent().getModel("local");
            const sFormat = oLocal.getProperty("/barcode/format");
            const sCode = oLocal.getProperty("/barcode/code") || "MSU-DEFAULT";
            
            const oContainer = document.getElementById("msu-qrcode");
            
            if (!oContainer) {
                console.warn("⚠️ Container not ready, retrying...");
                setTimeout(() => this._renderBarcode(), 300);
                return;
            }

            // Clear previous barcode
            oContainer.innerHTML = "";

            try {
                if (sFormat === "QR") {
                    // ===== QR CODE =====
                    if (window.QRCode) {
                        new window.QRCode(oContainer, {
                            text: sCode,
                            width: 200,
                            height: 200,
                            colorDark: "#1A202C",
                            colorLight: "#FFFFFF",
                            correctLevel: window.QRCode.CorrectLevel.H
                        });
                        console.log("✅ QR Code rendered:", sCode);
                    } else {
                        oContainer.innerHTML = "<div style='color:red;padding:80px 20px;'>QRCode library not loaded</div>";
                    }
                    
                } else if (sFormat === "DM") {
                    // ===== DATA MATRIX using bwip-js =====
                    if (window.bwipjs) {
                        const oCanvas = document.createElement("canvas");
                        oContainer.appendChild(oCanvas);
                        
                        window.bwipjs.toCanvas(oCanvas, {
                            bcid:            'datamatrix',
                            text:            sCode,
                            scale:           4,
                            height:          50,
                            includetext:     false,
                            backgroundcolor: 'FFFFFF',
                            padding:         10
                        });
                        console.log("✅ Data Matrix rendered:", sCode);
                    } else {
                        oContainer.innerHTML = "<div style='color:red;padding:80px 20px;'>bwip-js library not loaded. Check index.html</div>";
                    }
                    
                } else if (sFormat === "C128") {
                    // ===== CODE 128 =====
                    if (window.JsBarcode) {
                        const oSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                        oContainer.appendChild(oSvg);
                        window.JsBarcode(oSvg, sCode, {
                            format: "CODE128",
                            width: 2,
                            height: 100,
                            displayValue: false,
                            background: "#FFFFFF",
                            lineColor: "#1A202C",
                            margin: 10
                        });
                        console.log("✅ Code128 rendered:", sCode);
                    } else {
                        oContainer.innerHTML = "<div style='color:red;padding:80px 20px;'>JsBarcode library not loaded</div>";
                    }
                    
                } else if (sFormat === "EAN13") {
                    // ===== EAN-13 =====
                    if (window.JsBarcode) {
                        // EAN13 requires exactly 12 digits
                        let sDigits = "";
                        for (let i = 0; i < sCode.length && sDigits.length < 12; i++) {
                            const c = sCode.charCodeAt(i);
                            if (c >= 48 && c <= 57) {
                                sDigits += String.fromCharCode(c);
                            } else {
                                sDigits += (c % 10);
                            }
                        }
                        sDigits = sDigits.padEnd(12, '0').substring(0, 12);
                        
                        const oSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                        oContainer.appendChild(oSvg);
                        window.JsBarcode(oSvg, sDigits, {
                            format: "EAN13",
                            width: 2,
                            height: 100,
                            background: "#FFFFFF",
                            lineColor: "#1A202C",
                            margin: 10
                        });
                        console.log("✅ EAN13 rendered:", sDigits);
                    }
                }
            } catch (e) {
                console.error("Barcode render error:", e);
                oContainer.innerHTML = "<div style='color:red;padding:80px 20px;'>Error: " + e.message + "</div>";
            }
        },

        // ============================================
        // RESET IDENTIFIERS
        // ============================================
        onResetIdentifiers: function () {
            const oLocal = this.getOwnerComponent().getModel("local");
            oLocal.setProperty("/barcode/identifiers", {
                colour: "Auto",
                size: "Auto",
                designNo: "MSU-DN-AUTO",
                shadeNo: "SH-AUTO",
                weight: "Auto",
                designer: "Auto",
                merchandiser: "Auto",
                condition: "Auto"
            });
            MessageToast.show("Reset to auto-generated");
        },

        // ============================================
        // PRINT / SAVE
        // ============================================
        onPrint: function () {
            const oLocal = this.getOwnerComponent().getModel("local");
            const sCode = oLocal.getProperty("/barcode/code");
            const sProduct = oLocal.getProperty("/barcode/product");
            const sFormat = oLocal.getProperty("/barcode/formatName");
            
            const oContainer = document.getElementById("msu-qrcode");
            if (!oContainer || !oContainer.innerHTML) {
                MessageToast.show("Please generate a barcode first");
                return;
            }
            
            const sHtml = oContainer.innerHTML;
            
            const oPrintWin = window.open("", "_blank");
            oPrintWin.document.write(`
                <html>
                    <head>
                        <title>Print - ${sCode}</title>
                        <style>
                            body { 
                                font-family: Arial, sans-serif; 
                                text-align: center; 
                                padding: 40px; 
                            }
                            h2 { color: #EB6D2F; margin-bottom: 8px; }
                            .product { color: #4A5568; font-size: 16px; margin-bottom: 24px; }
                            .container { 
                                display: inline-block; 
                                padding: 24px; 
                                background: white; 
                                border: 2px solid #E4E7EB;
                                border-radius: 8px;
                            }
                            .code { 
                                font-family: 'Courier New', monospace; 
                                font-size: 14px; 
                                margin-top: 16px; 
                                color: #1A202C;
                                font-weight: bold;
                            }
                            .format {
                                color: #718096;
                                font-size: 12px;
                                margin-top: 4px;
                            }
                            @media print {
                                body { padding: 20px; }
                            }
                        </style>
                    </head>
                    <body>
                        <h2>MSU Vendor Portal</h2>
                        <div class="product">${sProduct}</div>
                        <div class="container">${sHtml}</div>
                        <div class="code">${sCode}</div>
                        <div class="format">${sFormat}</div>
                        <script>
                            window.onload = function() { 
                                setTimeout(function() { window.print(); }, 500); 
                            }
                        <\/script>
                    </body>
                </html>
            `);
            oPrintWin.document.close();
            
            MessageBox.success("Print dialog opened. Save as PDF or send to printer.", { 
                title: "Ready to Print" 
            });
        }
    });
});