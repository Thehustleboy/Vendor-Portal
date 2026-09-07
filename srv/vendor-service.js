const cds = require('@sap/cds');
const crypto = require('crypto');

module.exports = cds.service.impl(async function () {

    const { Vendors, PurchaseOrders, POItems, Invoices, Deliveries } = this.entities;

    // ============================================
    // FUNCTION: Get Vendor Dashboard KPIs
    // ============================================
    this.on('getVendorDashboard', async (req) => {
        const { vendorId } = req.data;

        try {
            const vendor = await SELECT.one.from(Vendors).where({ vendorId });
            if (!vendor) return req.error(404, `Vendor ${vendorId} not found`);

            const openPOs = await SELECT.from(PurchaseOrders)
                .where({ vendor_vendorId: vendorId, status: 'Open' });

            const confirmedPOs = await SELECT.from(PurchaseOrders)
                .where({ vendor_vendorId: vendorId, status: 'Confirmed' });

            const pendingInvoices = await SELECT.from(Invoices)
                .where({ vendor_vendorId: vendorId, status: 'Pending' });

            const paidInvoices = await SELECT.from(Invoices)
                .where({ vendor_vendorId: vendorId, status: 'Paid' });

            const totalPayments = paidInvoices.reduce(
                (sum, inv) => sum + Number(inv.netAmount || 0), 0
            );

            const today = new Date();
            const nextWeek = new Date();
            nextWeek.setDate(today.getDate() + 7);

            const upcomingDeliveries = await SELECT.from(Deliveries)
                .where({ vendor_vendorId: vendorId })
                .and(`deliveryDate BETWEEN ${today.toISOString().split('T')[0]} 
                      AND ${nextWeek.toISOString().split('T')[0]}`);

            return {
                vendorName: vendor.name,
                openPOs: openPOs.length,
                confirmedPOs: confirmedPOs.length,
                pendingInvoices: pendingInvoices.length,
                paidInvoices: paidInvoices.length,
                totalPayments: totalPayments,
                upcomingDeliveries: upcomingDeliveries.length
            };
        } catch (error) {
            console.error(error);
            return req.error(500, error.message);
        }
    });

    // ============================================
    // FUNCTION: Get all POs for a Vendor
    // ============================================
    this.on('getPOsByVendor', async (req) => {
        const { vendorId, status } = req.data;

        let query = SELECT.from(PurchaseOrders)
            .where({ vendor_vendorId: vendorId });

        if (status) {
            query = query.and({ status });
        }

        return await query;
    });

    // ============================================
    // FUNCTION: Get PO Details with Items
    // ============================================
    this.on('getPODetails', async (req) => {
        const { poNumber } = req.data;

        const header = await SELECT.one.from(PurchaseOrders)
            .where({ poNumber });

        if (!header) {
            return req.error(404, `PO ${poNumber} not found`);
        }

        const items = await SELECT.from(POItems)
            .where({ po_poNumber: poNumber });

        return { header, items };
    });

    // ============================================
    // ACTION: Vendor Login (Custom Auth)
    // ============================================
    this.on('vendorLogin', async (req) => {
        const { vendorId, password } = req.data;

        const vendor = await SELECT.one.from('vendor.portal.Vendors')
            .where({ vendorId });

        if (!vendor) {
            return { success: false, message: 'Vendor not found', token: null, vendor: null };
        }

        // Hash the input password and compare
        const hashedInput = crypto.createHash('sha256').update(password).digest('hex');

        if (vendor.password !== hashedInput) {
            return { success: false, message: 'Invalid password', token: null, vendor: null };
        }

        // Generate simple token (in production use JWT)
        const token = crypto.randomBytes(32).toString('hex');

        // Remove password before returning
        delete vendor.password;

        return {
            success: true,
            message: 'Login successful',
            token: token,
            vendor: vendor
        };
    });

    // ============================================
    // ACTION: Confirm Purchase Order
    // ============================================
    this.on('confirmPurchaseOrder', async (req) => {
        const { poNumber } = req.data;

        const result = await UPDATE(PurchaseOrders)
            .set({ status: 'Confirmed' })
            .where({ poNumber });

        if (result === 0) {
            return req.error(404, `PO ${poNumber} not found`);
        }

        return true;
    });

    // ============================================
    // ACTION: Reject Purchase Order
    // ============================================
    this.on('rejectPurchaseOrder', async (req) => {
        const { poNumber, reason } = req.data;

        const result = await UPDATE(PurchaseOrders)
            .set({ status: 'Rejected' })
            .where({ poNumber });

        if (result === 0) {
            return req.error(404, `PO ${poNumber} not found`);
        }

        console.log(`PO ${poNumber} rejected. Reason: ${reason}`);
        return true;
    });

    // ============================================
    // ACTION: Submit Invoice
    // ============================================
    this.on('submitInvoice', async (req) => {
        const { poNumber, grossAmount, taxAmount, currency } = req.data;

        const po = await SELECT.one.from(PurchaseOrders).where({ poNumber });
        if (!po) return req.error(404, `PO ${poNumber} not found`);

        if (po.status !== 'Confirmed') {
            return req.error(400, `PO must be Confirmed. Current status: ${po.status}`);
        }

        const invoiceNumber = 'INV' + Date.now().toString().slice(-8);
        const netAmount = Number(grossAmount) - Number(taxAmount || 0);

        await INSERT.into(Invoices).entries({
            invoiceNumber,
            vendor_vendorId: po.vendor_vendorId,
            poNumber,
            invoiceDate: new Date().toISOString().split('T')[0],
            grossAmount,
            taxAmount: taxAmount || 0,
            netAmount,
            currency: currency || 'USD',
            status: 'Pending'
        });

        return {
            invoiceNumber,
            status: 'Pending',
            message: `Invoice ${invoiceNumber} submitted successfully`
        };
    });

    // ============================================
    // BEFORE HOOKS: Validation
    // ============================================
    this.before('CREATE', Invoices, (req) => {
        if (req.data.grossAmount <= 0) {
            req.error(400, 'Gross amount must be greater than 0');
        }
    });

    this.before('UPDATE', PurchaseOrders, (req) => {
        const validStatuses = ['Open', 'Confirmed', 'Rejected', 'Delivered'];
        if (req.data.status && !validStatuses.includes(req.data.status)) {
            req.error(400, `Invalid status. Must be one of: ${validStatuses.join(', ')}`);
        }
    });

    // ============================================
    // AFTER HOOKS: Logging
    // ============================================
    this.after('CREATE', Invoices, (data) => {
        console.log(`✅ New invoice created: ${data.invoiceNumber}`);
    });
});