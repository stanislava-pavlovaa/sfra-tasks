'use strict';

var base = require("base/checkout/billing");

/**
 * Updates the billing address form values within payment forms without any payment instrument validation
 * @param {Object} order - the order model
 */
base.methods.updateBillingAddress = function(order) {
    console.log('billing');
    console.log(order);
    var billing = order.billing;
    if (!billing.billingAddress || !billing.billingAddress.address) return;

    var form = $('form[name=dwfrm_billing]');
    if (!form) return;
    
    $('input[name$=_firstName]', form).val(billing.billingAddress.address.firstName);
    $('input[name$=_lastName]', form).val(billing.billingAddress.address.lastName);
    $('input[name$=_address1]', form).val(billing.billingAddress.address.address1);
    $('input[name$=_address2]', form).val(billing.billingAddress.address.address2);
    $('input[name$=_city]', form).val(billing.billingAddress.address.city);
    $('input[name$=_postalCode]', form).val(billing.billingAddress.address.postalCode);
    $('select[name$=_stateCode],input[name$=_stateCode]', form).val(billing.billingAddress.address.stateCode);
    $('select[name$=_country]', form).val(billing.billingAddress.address.countryCode.value);
    $('input[name$=_phone]', form).val(billing.billingAddress.address.phone);
    $('input[name$=_email]', form).val(order.orderEmail);

    if (billing.billingAddress.address.companyName) {
        $('input[name$=_companyName]', form).val(billing.billingAddress.address.companyName);
    }

    if (billing.billingAddress.address.vat) {
        $('input[name$=_vat]', form).val(billing.billingAddress.address.vat);
    }

}

module.exports = base;
