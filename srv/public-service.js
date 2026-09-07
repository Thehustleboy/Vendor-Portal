const cds = require('@sap/cds');
const crypto = require('crypto');

module.exports = cds.service.impl(async function () {

    // ============================================
    // ACTION: Register New Vendor
    // ============================================
    this.on('vendorRegister', async (req) => {
        const { vendorId, name, email, password } = req.data;

        // Check if vendor exists
        const existing = await SELECT.one.from('vendor.portal.Vendors')
            .where({ vendorId });

        if (existing) {
            return { success: false, message: 'Vendor ID already exists' };
        }

        // Hash password
        const hashedPassword = crypto.createHash('sha256')
            .update(password).digest('hex');

        // Insert new vendor
        await INSERT.into('vendor.portal.Vendors').entries({
            vendorId,
            name,
            email,
            password: hashedPassword,
            status: 'Active'
        });

        return {
            success: true,
            message: `Vendor ${vendorId} registered successfully`
        };
    });
});