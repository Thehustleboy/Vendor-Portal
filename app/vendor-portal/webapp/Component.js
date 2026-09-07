sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel"
], function (
    UIComponent,
    JSONModel
) {
    "use strict";

    return UIComponent.extend("msu.vendorportal.Component", {

        metadata: {
            manifest: "json"
        },

        init: function () {

            UIComponent.prototype.init.apply(this, arguments);

            const oLocalModel = new JSONModel({

                /* =====================================================
                   VENDOR
                   ===================================================== */

                vendor: {
                    id: "V001",
                    name: "Kanchipuram Silk",
                    location: "Sarees • Zari • Kanchipuram, TN",
                    initials: "KS"
                },


                /* =====================================================
                   DASHBOARD
                   ===================================================== */

                dashboard: {
                    openPOs: 13,
                    totalSales: "₹7.7L",
                    inTransit: 1,
                    trending: 2
                },


                /* =====================================================
                   RECENT ORDERS
                   ===================================================== */

                recentOrders: [
                    {
                        id: "MSU-2026-88963",
                        date: "11 May 2026",
                        product: "Silk Saree × 4",
                        qty: "4 pcs total • ₹1.2L",
                        status: "Confirmed",
                        color: "#8B4A9E",
                        initials: "SS"
                    },
                    {
                        id: "MSU-2026-80161",
                        date: "12 May 2026",
                        product: "Silk Saree × 10",
                        qty: "10 pcs total • ₹11.8L",
                        status: "Confirmed",
                        color: "#8B4A9E",
                        initials: "SS"
                    },
                    {
                        id: "MSU-2026-97695",
                        date: "13 May 2026",
                        product: "Kanjeevaram Saree × 50",
                        qty: "50 pcs total • ₹59.8L",
                        status: "New",
                        color: "#4A5568",
                        initials: "KS"
                    }
                ],


                /* =====================================================
                   STORE FILTER
                   ===================================================== */

                selectedStore: "All",


                /* =====================================================
                   STOCK
                   ===================================================== */

                stockItems: [

                    /* =================================================
                       1 - COMMERCIAL STREET
                       ================================================= */

                    {
                        id: "1",

                        name: "Silk Saree",

                        category: "Traditional Silk Saree",

                        store: "Commercial St.",

                        po: "MSU-2026-97695",

                        image:
                            "https://commons.wikimedia.org/wiki/Special:FilePath/Silk%20saree%20on%20the%20making%20at%20Kanchipuram%20%287642281054%29.jpg",

                        selectedImage:
                            "https://commons.wikimedia.org/wiki/Special:FilePath/Silk%20saree%20on%20the%20making%20at%20Kanchipuram%20%287642281054%29.jpg",

                        images: [
                            {
                                url:
                                    "https://commons.wikimedia.org/wiki/Special:FilePath/Silk%20saree%20on%20the%20making%20at%20Kanchipuram%20%287642281054%29.jpg"
                            },
                            {
                                url:
                                    "https://commons.wikimedia.org/wiki/Special:FilePath/Kanchipuram%20silk%20sareer.JPG"
                            },
                            {
                                url:
                                    "https://commons.wikimedia.org/wiki/Special:FilePath/Banarasi%20Silk%20Saree.jpg"
                            },
                            {
                                url:
                                    "https://commons.wikimedia.org/wiki/Special:FilePath/Pochampalli%20Ikat%20saree.jpg"
                            }
                        ],

                        health: "Healthy",

                        color: "Deep Crimson",

                        material: "Pure Silk",

                        designNo: "MSU-DN-2168",

                        condition: "New / Pristine",

                        weight: "1.05 kg",

                        shelf: "SH-246",

                        pattern: "Traditional Temple Border",

                        zari: "Golden Zari",

                        length: "6.2 m",

                        width: "1.2 m",

                        blousePiece: "Included",

                        origin: "Kanchipuram",

                        occasion: "Wedding / Traditional",

                        care: "Dry Clean Only",

                        description:
                            "Premium traditional silk saree with rich crimson body and classic zari detailing.",

                        tags: [
                            "Deep Crimson",
                            "Silk",
                            "MSU-DN-2168",
                            "New / Pristine",
                            "1.05kg",
                            "SH-246"
                        ],

                        staff: [
                            "Anjali Singh",
                            "Priya Rajan"
                        ],

                        onHand: 3,

                        allocated: 3,

                        fillRate: 100
                    },


                    /* =================================================
                       2 - COMMERCIAL STREET
                       ================================================= */

                    {
                        id: "2",

                        name: "Kanjeevaram Saree",

                        category: "Kanjeevaram Silk",

                        store: "Commercial St.",

                        po: "MSU-2026-97696",

                        image:
                            "https://commons.wikimedia.org/wiki/Special:FilePath/Kanchipuram%20silk%20sareer.JPG",

                        selectedImage:
                            "https://commons.wikimedia.org/wiki/Special:FilePath/Kanchipuram%20silk%20sareer.JPG",

                        images: [
                            {
                                url:
                                    "https://commons.wikimedia.org/wiki/Special:FilePath/Kanchipuram%20silk%20sareer.JPG"
                            },
                            {
                                url:
                                    "https://commons.wikimedia.org/wiki/Special:FilePath/Silk%20saree%20on%20the%20making%20at%20Kanchipuram%20%287642281054%29.jpg"
                            },
                            {
                                url:
                                    "https://commons.wikimedia.org/wiki/Special:FilePath/Banarasi%20Silk%20Saree.jpg"
                            }
                        ],

                        health: "Healthy",

                        color: "Midnight Purple",

                        material: "Kanjeevaram Silk",

                        designNo: "MSU-7441",

                        condition: "Good",

                        weight: "1.3 kg",

                        shelf: "SH-905",

                        pattern: "Traditional Bridal",

                        zari: "Gold Zari",

                        length: "7 m",

                        width: "1.2 m",

                        blousePiece: "Included",

                        origin: "Kanchipuram",

                        occasion: "Wedding",

                        care: "Dry Clean Only",

                        description:
                            "Traditional Kanjeevaram silk saree featuring heavy golden zari and bridal styling.",

                        tags: [
                            "Midnight Purple",
                            "7m",
                            "MSU-7441",
                            "Good",
                            "1.3kg",
                            "SH-905"
                        ],

                        staff: [
                            "Mohan Lal",
                            "Rohit Sharma"
                        ],

                        onHand: 9,

                        allocated: 9,

                        fillRate: 100
                    },


                    /* =================================================
                       3 - COMMERCIAL STREET
                       ================================================= */

                    {
                        id: "3",

                        name: "Banarasi Silk Saree",

                        category: "Banarasi Silk",

                        store: "Commercial St.",

                        po: "MSU-2026-88963",

                        image:
                            "https://commons.wikimedia.org/wiki/Special:FilePath/Banarasi%20Silk%20Saree.jpg",

                        selectedImage:
                            "https://commons.wikimedia.org/wiki/Special:FilePath/Banarasi%20Silk%20Saree.jpg",

                        images: [
                            {
                                url:
                                    "https://commons.wikimedia.org/wiki/Special:FilePath/Banarasi%20Silk%20Saree.jpg"
                            },
                            {
                                url:
                                    "https://commons.wikimedia.org/wiki/Special:FilePath/Kanchipuram%20silk%20sareer.JPG"
                            },
                            {
                                url:
                                    "https://commons.wikimedia.org/wiki/Special:FilePath/Kalamkari%20sari.jpg"
                            }
                        ],

                        health: "Mid",

                        color: "Royal Blue",

                        material: "Banarasi Silk",

                        designNo: "MSU-DN-2258",

                        condition: "QC Pending",

                        weight: "1.1 kg",

                        shelf: "SH-302",

                        pattern: "Floral Brocade",

                        zari: "Silver Zari",

                        length: "6.3 m",

                        width: "1.15 m",

                        blousePiece: "Included",

                        origin: "Varanasi",

                        occasion: "Festive / Wedding",

                        care: "Dry Clean Only",

                        description:
                            "Royal blue Banarasi silk saree featuring traditional woven brocade work.",

                        tags: [
                            "Royal Blue",
                            "Silk",
                            "MSU-DN-2258",
                            "QC Pending",
                            "1.1kg",
                            "SH-302"
                        ],

                        staff: [
                            "Anjali Singh",
                            "Mohan Lal"
                        ],

                        onHand: 7,

                        allocated: 10,

                        fillRate: 70
                    },


                    /* =================================================
                       4 - JUBILEE HILLS
                       ================================================= */

                    {
                        id: "4",

                        name: "Kanjeevaram Saree",

                        category: "Kanjeevaram Silk",

                        store: "Jubilee Hills",

                        po: "MSU-2026-24722",

                        image:
                            "https://commons.wikimedia.org/wiki/Special:FilePath/Kanchipuram%20silk%20sareer.JPG",

                        selectedImage:
                            "https://commons.wikimedia.org/wiki/Special:FilePath/Kanchipuram%20silk%20sareer.JPG",

                        images: [
                            {
                                url:
                                    "https://commons.wikimedia.org/wiki/Special:FilePath/Kanchipuram%20silk%20sareer.JPG"
                            },
                            {
                                url:
                                    "https://commons.wikimedia.org/wiki/Special:FilePath/Silk%20saree%20on%20the%20making%20at%20Kanchipuram%20%287642281054%29.jpg"
                            },
                            {
                                url:
                                    "https://commons.wikimedia.org/wiki/Special:FilePath/Pochampalli%20Ikat%20saree.jpg"
                            }
                        ],

                        health: "Healthy",

                        color: "Forest Green",

                        material: "Kanjeevaram Silk",

                        designNo: "MSU-DN-3925",

                        condition: "QC Pending",

                        weight: "850 g",

                        shelf: "SH-465",

                        pattern: "Traditional Border",

                        zari: "Gold Zari",

                        length: "6.2 m",

                        width: "1.2 m",

                        blousePiece: "Included",

                        origin: "Kanchipuram",

                        occasion: "Wedding / Festival",

                        care: "Dry Clean Only",

                        description:
                            "Forest green Kanjeevaram silk with traditional zari border and premium finish.",

                        tags: [
                            "Forest Green",
                            "Free Size",
                            "MSU-DN-3925",
                            "QC Pending",
                            "850g",
                            "SH-465"
                        ],

                        staff: [
                            "Vikram Gupta",
                            "Arjun Das"
                        ],

                        onHand: 14,

                        allocated: 17,

                        fillRate: 82
                    },


                    /* =================================================
                       5 - JUBILEE HILLS
                       ================================================= */

                    {
                        id: "5",

                        name: "Banarasi Silk Saree",

                        category: "Banarasi Silk",

                        store: "Jubilee Hills",

                        po: "MSU-2026-24723",

                        image:
                            "https://commons.wikimedia.org/wiki/Special:FilePath/Banarasi%20Silk%20Saree.jpg",

                        selectedImage:
                            "https://commons.wikimedia.org/wiki/Special:FilePath/Banarasi%20Silk%20Saree.jpg",

                        images: [
                            {
                                url:
                                    "https://commons.wikimedia.org/wiki/Special:FilePath/Banarasi%20Silk%20Saree.jpg"
                            },
                            {
                                url:
                                    "https://commons.wikimedia.org/wiki/Special:FilePath/Pochampalli%20Ikat%20saree.jpg"
                            },
                            {
                                url:
                                    "https://commons.wikimedia.org/wiki/Special:FilePath/Kalamkari%20sari.jpg"
                            }
                        ],

                        health: "Healthy",

                        color: "Royal Blue",

                        material: "Banarasi Silk",

                        designNo: "MSU-DN-4015",

                        condition: "New",

                        weight: "1.2 kg",

                        shelf: "SH-470",

                        pattern: "Traditional Floral",

                        zari: "Gold Zari",

                        length: "6.2 m",

                        width: "1.15 m",

                        blousePiece: "Included",

                        origin: "Varanasi",

                        occasion: "Wedding / Festival",

                        care: "Dry Clean Only",

                        description:
                            "Traditional Banarasi saree with floral woven work and golden zari detailing.",

                        tags: [
                            "Royal Blue",
                            "6.2m",
                            "MSU-DN-4015",
                            "New",
                            "1.2kg",
                            "SH-470"
                        ],

                        staff: [
                            "Vikram Gupta",
                            "Sneha Rao"
                        ],

                        onHand: 12,

                        allocated: 12,

                        fillRate: 100
                    },


                    /* =================================================
                       6 - JUBILEE HILLS
                       ================================================= */

                    {
                        id: "6",

                        name: "Silk Saree",

                        category: "Pure Silk",

                        store: "Jubilee Hills",

                        po: "MSU-2026-24724",

                        image:
                            "https://commons.wikimedia.org/wiki/Special:FilePath/Silk%20saree%20on%20the%20making%20at%20Kanchipuram%20%287642281054%29.jpg",

                        selectedImage:
                            "https://commons.wikimedia.org/wiki/Special:FilePath/Silk%20saree%20on%20the%20making%20at%20Kanchipuram%20%287642281054%29.jpg",

                        images: [
                            {
                                url:
                                    "https://commons.wikimedia.org/wiki/Special:FilePath/Silk%20saree%20on%20the%20making%20at%20Kanchipuram%20%287642281054%29.jpg"
                            },
                            {
                                url:
                                    "https://commons.wikimedia.org/wiki/Special:FilePath/Kanchipuram%20silk%20sareer.JPG"
                            },
                            {
                                url:
                                    "https://commons.wikimedia.org/wiki/Special:FilePath/Kalamkari%20sari.jpg"
                            }
                        ],

                        health: "Mid",

                        color: "Crimson Red",

                        material: "Pure Silk",

                        designNo: "MSU-DN-4020",

                        condition: "QC Pending",

                        weight: "950 g",

                        shelf: "SH-475",

                        pattern: "Traditional",

                        zari: "Gold Zari",

                        length: "6 m",

                        width: "1.2 m",

                        blousePiece: "Included",

                        origin: "Kanchipuram",

                        occasion: "Traditional",

                        care: "Dry Clean Only",

                        description:
                            "Crimson pure silk saree with traditional zari border.",

                        tags: [
                            "Crimson Red",
                            "6m",
                            "MSU-DN-4020",
                            "QC Pending",
                            "950g",
                            "SH-475"
                        ],

                        staff: [
                            "Arjun Das",
                            "Sneha Rao"
                        ],

                        onHand: 6,

                        allocated: 10,

                        fillRate: 60
                    },


                    /* =================================================
                       7 - HSR LAYOUT
                       ================================================= */

                    {
                        id: "7",

                        name: "Cotton Silk Saree",

                        category: "Cotton Silk",

                        store: "HSR Layout",

                        po: "MSU-2026-95871",

                        image:
                            "https://commons.wikimedia.org/wiki/Special:FilePath/Pochampalli%20Ikat%20saree.jpg",

                        selectedImage:
                            "https://commons.wikimedia.org/wiki/Special:FilePath/Pochampalli%20Ikat%20saree.jpg",

                        images: [
                            {
                                url:
                                    "https://commons.wikimedia.org/wiki/Special:FilePath/Pochampalli%20Ikat%20saree.jpg"
                            },
                            {
                                url:
                                    "https://commons.wikimedia.org/wiki/Special:FilePath/Kalamkari%20sari.jpg"
                            },
                            {
                                url:
                                    "https://commons.wikimedia.org/wiki/Special:FilePath/Banarasi%20Silk%20Saree.jpg"
                            }
                        ],

                        health: "Healthy",

                        color: "Mustard Yellow",

                        material: "Cotton Silk",

                        designNo: "MSU-DN-7505",

                        condition: "New / Pristine",

                        weight: "750 g",

                        shelf: "SH-238",

                        pattern: "Ikat",

                        zari: "Light Zari",

                        length: "6.2 m",

                        width: "1.15 m",

                        blousePiece: "Included",

                        origin: "Telangana",

                        occasion: "Casual / Festive",

                        care: "Gentle Dry Clean",

                        description:
                            "Lightweight cotton silk saree suitable for festive and casual occasions.",

                        tags: [
                            "Mustard Yellow",
                            "Free Size",
                            "MSU-DN-7505",
                            "New / Pristine",
                            "750g",
                            "SH-238"
                        ],

                        staff: [
                            "Pooja Shah",
                            "Amit Jain"
                        ],

                        onHand: 20,

                        allocated: 18,

                        fillRate: 100
                    },


                    /* =================================================
                       8 - HSR
                       ================================================= */

                    {
                        id: "8",

                        name: "Kalamkari Saree",

                        category: "Kalamkari",

                        store: "HSR Layout",

                        po: "MSU-2026-95872",

                        image:
                            "https://commons.wikimedia.org/wiki/Special:FilePath/Kalamkari%20sari.jpg",

                        selectedImage:
                            "https://commons.wikimedia.org/wiki/Special:FilePath/Kalamkari%20sari.jpg",

                        images: [
                            {
                                url:
                                    "https://commons.wikimedia.org/wiki/Special:FilePath/Kalamkari%20sari.jpg"
                            },
                            {
                                url:
                                    "https://commons.wikimedia.org/wiki/Special:FilePath/Pochampalli%20Ikat%20saree.jpg"
                            },
                            {
                                url:
                                    "https://commons.wikimedia.org/wiki/Special:FilePath/Banarasi%20Silk%20Saree.jpg"
                            }
                        ],

                        health: "Healthy",

                        color: "Natural Beige",

                        material: "Cotton",

                        designNo: "MSU-DN-7510",

                        condition: "Good",

                        weight: "900 g",

                        shelf: "SH-240",

                        pattern: "Kalamkari Print",

                        zari: "No Zari",

                        length: "6 m",

                        width: "1.15 m",

                        blousePiece: "Included",

                        origin: "Andhra Pradesh",

                        occasion: "Casual / Festive",

                        care: "Hand Wash / Dry Clean",

                        description:
                            "Traditional Kalamkari printed saree with natural earthy styling.",

                        tags: [
                            "Natural Beige",
                            "6m",
                            "MSU-DN-7510",
                            "Good",
                            "900g",
                            "SH-240"
                        ],

                        staff: [
                            "Pooja Shah",
                            "Rahul Jain"
                        ],

                        onHand: 16,

                        allocated: 15,

                        fillRate: 100
                    },


                    /* =================================================
                       9 - HSR
                       ================================================= */

                    {
                        id: "9",

                        name: "Kanjeevaram Saree",

                        category: "Kanjeevaram",

                        store: "HSR Layout",

                        po: "MSU-2026-95873",

                        image:
                            "https://commons.wikimedia.org/wiki/Special:FilePath/Kanchipuram%20silk%20sareer.JPG",

                        selectedImage:
                            "https://commons.wikimedia.org/wiki/Special:FilePath/Kanchipuram%20silk%20sareer.JPG",

                        images: [
                            {
                                url:
                                    "https://commons.wikimedia.org/wiki/Special:FilePath/Kanchipuram%20silk%20sareer.JPG"
                            },
                            {
                                url:
                                    "https://commons.wikimedia.org/wiki/Special:FilePath/Silk%20saree%20on%20the%20making%20at%20Kanchipuram%20%287642281054%29.jpg"
                            }
                        ],

                        health: "Mid",

                        color: "Purple",

                        material: "Kanjeevaram Silk",

                        designNo: "MSU-DN-7515",

                        condition: "QC Pending",

                        weight: "1.2 kg",

                        shelf: "SH-245",

                        pattern: "Traditional",

                        zari: "Gold Zari",

                        length: "7 m",

                        width: "1.2 m",

                        blousePiece: "Included",

                        origin: "Kanchipuram",

                        occasion: "Wedding",

                        care: "Dry Clean Only",

                        description:
                            "Premium purple Kanjeevaram saree with gold zari detailing.",

                        tags: [
                            "Purple",
                            "7m",
                            "MSU-DN-7515",
                            "QC Pending",
                            "1.2kg",
                            "SH-245"
                        ],

                        staff: [
                            "Amit Jain",
                            "Rahul Jain"
                        ],

                        onHand: 7,

                        allocated: 10,

                        fillRate: 70
                    },


                    /* =================================================
                       10 - VIJAYAWADA
                       ================================================= */

                    {
                        id: "10",

                        name: "Pochampally Saree",

                        category: "Pochampally Ikat",

                        store: "Vijayawada",

                        po: "MSU-2026-78541",

                        image:
                            "https://commons.wikimedia.org/wiki/Special:FilePath/Pochampalli%20Ikat%20saree.jpg",

                        selectedImage:
                            "https://commons.wikimedia.org/wiki/Special:FilePath/Pochampalli%20Ikat%20saree.jpg",

                        images: [
                            {
                                url:
                                    "https://commons.wikimedia.org/wiki/Special:FilePath/Pochampalli%20Ikat%20saree.jpg"
                            },
                            {
                                url:
                                    "https://commons.wikimedia.org/wiki/Special:FilePath/Kalamkari%20sari.jpg"
                            }
                        ],

                        health: "Healthy",

                        color: "Maroon",

                        material: "Silk Cotton",

                        designNo: "MSU-DN-7854",

                        condition: "New",

                        weight: "900 g",

                        shelf: "SH-785",

                        pattern: "Ikat",

                        zari: "Minimal Zari",

                        length: "6 m",

                        width: "1.15 m",

                        blousePiece: "Included",

                        origin: "Pochampally",

                        occasion: "Festive",

                        care: "Dry Clean",

                        description:
                            "Traditional Pochampally Ikat saree featuring geometric woven patterns.",

                        tags: [
                            "Maroon",
                            "6m",
                            "MSU-DN-7854",
                            "New",
                            "900g",
                            "SH-785"
                        ],

                        staff: [
                            "Ravi Kumar",
                            "Meena Devi"
                        ],

                        onHand: 15,

                        allocated: 14,

                        fillRate: 100
                    },


                    /* =================================================
                       11 - VIJAYAWADA
                       ================================================= */

                    {
                        id: "11",

                        name: "Kalamkari Saree",

                        category: "Kalamkari",

                        store: "Vijayawada",

                        po: "MSU-2026-78542",

                        image:
                            "https://commons.wikimedia.org/wiki/Special:FilePath/Kalamkari%20sari.jpg",

                        selectedImage:
                            "https://commons.wikimedia.org/wiki/Special:FilePath/Kalamkari%20sari.jpg",

                        images: [
                            {
                                url:
                                    "https://commons.wikimedia.org/wiki/Special:FilePath/Kalamkari%20sari.jpg"
                            },
                            {
                                url:
                                    "https://commons.wikimedia.org/wiki/Special:FilePath/Pochampalli%20Ikat%20saree.jpg"
                            }
                        ],

                        health: "Healthy",

                        color: "Traditional Red",

                        material: "Cotton",

                        designNo: "MSU-DN-7855",

                        condition: "Good",

                        weight: "800 g",

                        shelf: "SH-786",

                        pattern: "Hand Painted Kalamkari",

                        zari: "No Zari",

                        length: "6.2 m",

                        width: "1.15 m",

                        blousePiece: "Included",

                        origin: "Andhra Pradesh",

                        occasion: "Traditional / Casual",

                        care: "Gentle Wash",

                        description:
                            "Traditional Kalamkari saree showcasing Indian hand-art inspired motifs.",

                        tags: [
                            "Traditional Red",
                            "6.2m",
                            "MSU-DN-7855",
                            "Good",
                            "800g",
                            "SH-786"
                        ],

                        staff: [
                            "Ravi Kumar",
                            "Lakshmi Rao"
                        ],

                        onHand: 12,

                        allocated: 12,

                        fillRate: 100
                    },


                    /* =================================================
                       12 - VIJAYAWADA
                       ================================================= */

                    {
                        id: "12",

                        name: "Kanjeevaram Saree",

                        category: "Kanjeevaram Silk",

                        store: "Vijayawada",

                        po: "MSU-2026-95871",

                        image:
                            "https://commons.wikimedia.org/wiki/Special:FilePath/Kanchipuram%20silk%20sareer.JPG",

                        selectedImage:
                            "https://commons.wikimedia.org/wiki/Special:FilePath/Kanchipuram%20silk%20sareer.JPG",

                        images: [
                            {
                                url:
                                    "https://commons.wikimedia.org/wiki/Special:FilePath/Kanchipuram%20silk%20sareer.JPG"
                            },
                            {
                                url:
                                    "https://commons.wikimedia.org/wiki/Special:FilePath/Silk%20saree%20on%20the%20making%20at%20Kanchipuram%20%287642281054%29.jpg"
                            },
                            {
                                url:
                                    "https://commons.wikimedia.org/wiki/Special:FilePath/Banarasi%20Silk%20Saree.jpg"
                            }
                        ],

                        health: "Mid",

                        color: "Dusty Rose",

                        material: "Kanjeevaram Silk",

                        designNo: "MSU-DN-7505",

                        condition: "New / Pristine",

                        weight: "1.05 kg",

                        shelf: "SH-238",

                        pattern: "Traditional Floral",

                        zari: "Golden Zari",

                        length: "6.2 m",

                        width: "1.2 m",

                        blousePiece: "Included",

                        origin: "Kanchipuram",

                        occasion: "Wedding / Festive",

                        care: "Dry Clean Only",

                        description:
                            "Dusty rose Kanjeevaram silk saree featuring traditional floral zari work.",

                        tags: [
                            "Dusty Rose",
                            "XS/S",
                            "MSU-DN-7505",
                            "New / Pristine",
                            "1.05kg",
                            "SH-238"
                        ],

                        staff: [
                            "Anjali Singh",
                            "Priya Rajan"
                        ],

                        onHand: 11,

                        allocated: 16,

                        fillRate: 69
                    }

                ],


                /* =====================================================
                   PURCHASE ORDERS
                   ===================================================== */

                pos: [
                    {
                        id: "MSU-2026-88963",
                        date: "11 May 2026",
                        product: "Silk Saree × 4",
                        qty: "4 pcs total • ₹1.2L",
                        status: "Confirmed",
                        initials: "SS",
                        color: "#8B4A9E"
                    },
                    {
                        id: "MSU-2026-80161",
                        date: "12 May 2026",
                        product: "Silk Saree × 10",
                        qty: "10 pcs total • ₹11.8L",
                        status: "Confirmed",
                        initials: "SS",
                        color: "#8B4A9E"
                    },
                    {
                        id: "MSU-2026-97695",
                        date: "13 May 2026",
                        product: "Kanjeevaram Saree × 50",
                        qty: "50 pcs total • ₹59.8L",
                        status: "New",
                        initials: "KS",
                        color: "#4A5568"
                    }
                ],


                /* =====================================================
                   ASN
                   ===================================================== */

                asns: [
                    {
                        id: "ASN-2026-0101",
                        product: "Kanjeevaram Saree",
                        poRef: "MSU-2026-78432",
                        qty: "40",
                        status: "Delivered"
                    },
                    {
                        id: "ASN-2026-0102",
                        product: "Gold Zari",
                        poRef: "MSU-2026-91100",
                        qty: "80",
                        status: "In Transit"
                    },
                    {
                        id: "ASN-2026-0103",
                        product: "Silver Zari",
                        poRef: "MSU-2026-78433",
                        qty: "50",
                        status: "Packing"
                    }
                ]

            });


            this.setModel(
                oLocalModel,
                "local"
            );


            this.getRouter().initialize();
        }

    });

});