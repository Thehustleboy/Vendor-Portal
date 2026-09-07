namespace vendor.portal;

using { managed } from '@sap/cds/common';

// ============================================
// Vendor Master
// ============================================
entity Vendors : managed {
  key vendorId    : String(10);
      name        : String(100) not null;
      email       : String(100);
      phone       : String(20);
      address     : String(255);
      country     : String(3);
      status      : String(20) default 'Active';
      password    : String(255);

      purchaseOrders : Association to many PurchaseOrders on purchaseOrders.vendor = $self;
      invoices       : Association to many Invoices       on invoices.vendor       = $self;
}

// ============================================
// Purchase Orders
// ============================================
entity PurchaseOrders : managed {
  key poNumber     : String(10);
      vendor       : Association to Vendors;
      poDate       : Date;
      deliveryDate : Date;
      netAmount    : Decimal(15,2);
      currency     : String(5) default 'USD';
      status       : String(20) default 'Open';
      companyCode  : String(4);

      items        : Composition of many POItems on items.po = $self;
}

// ============================================
// PO Line Items
// ============================================
entity POItems {
  key po           : Association to PurchaseOrders;
  key itemNumber   : Integer;
      materialCode : String(18);
      description  : String(100);
      quantity     : Decimal(13,3);
      unit         : String(3);
      unitPrice    : Decimal(15,2);
      netAmount    : Decimal(15,2);
}

// ============================================
// Invoices
// ============================================
entity Invoices : managed {
  key invoiceNumber : String(10);
      vendor        : Association to Vendors;
      poNumber      : String(10);
      invoiceDate   : Date;
      dueDate       : Date;
      grossAmount   : Decimal(15,2);
      taxAmount     : Decimal(15,2);
      netAmount     : Decimal(15,2);
      currency      : String(5) default 'USD';
      status        : String(20) default 'Pending';
      paymentDate   : Date;
      notes         : String(500);
}

// ============================================
// Deliveries
// ============================================
entity Deliveries : managed {
  key deliveryId   : String(10);
      poNumber     : String(10);
      vendor       : Association to Vendors;
      deliveryDate : Date;
      trackingNo   : String(30);
      carrier      : String(50);
      status       : String(20);
}