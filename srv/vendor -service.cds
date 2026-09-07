using { vendor.portal as db } from '../db/schema';

// ============================================
// Vendor Portal Service
// ============================================
@path: '/vendor'
service VendorService {

  // ---------- Entities ----------
  @readonly
  entity Vendors as projection on db.Vendors excluding { password };

  entity PurchaseOrders as projection on db.PurchaseOrders;
  entity POItems        as projection on db.POItems;
  entity Invoices       as projection on db.Invoices;
  entity Deliveries     as projection on db.Deliveries;

  // ---------- Named Return Types ----------
  type DashboardKPI {
    vendorName         : String;
    openPOs            : Integer;
    confirmedPOs       : Integer;
    pendingInvoices    : Integer;
    paidInvoices       : Integer;
    totalPayments      : Decimal;
    upcomingDeliveries : Integer;
  }

  type InvoiceResult {
    invoiceNumber : String;
    status        : String;
    message       : String;
  }

  type LoginResult {
    success : Boolean;
    token   : String;
    message : String;
  }

  type SimpleResult {
    success : Boolean;
    message : String;
  }

  // ---------- Functions (Read) ----------
  function getVendorDashboard(vendorId: String) returns DashboardKPI;
  function getPOsByVendor(vendorId: String, status: String) returns array of PurchaseOrders;

  // ---------- Actions (Write) ----------
  action vendorLogin(vendorId: String, password: String) returns LoginResult;
  action confirmPurchaseOrder(poNumber: String) returns SimpleResult;
  action rejectPurchaseOrder(poNumber: String, reason: String) returns SimpleResult;
  action submitInvoice(
    poNumber    : String,
    grossAmount : Decimal,
    taxAmount   : Decimal,
    currency    : String
  ) returns InvoiceResult;
}


// ============================================
// Public Service (No Auth) - Registration
// ============================================
@path: '/public'
service PublicService {

  type RegisterResult {
    success : Boolean;
    message : String;
  }

  action vendorRegister(
    vendorId : String,
    name     : String,
    email    : String,
    password : String
  ) returns RegisterResult;
}