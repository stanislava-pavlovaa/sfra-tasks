'use strict';

var AddressModel = require('*/cartridge/models/address');
var URLUtils = require('dw/web/URLUtils');
var Customer = require('dw/customer/Customer');

/**
 * Creates an array of plain object that contains address book addresses, if any exist
 * @param {Object} addressBook - target customer
 * @returns {Array<Object>} an array of customer addresses
 */
function getAddresses(addressBook) {
    var result = [];
    if (addressBook) {
        for (var i = 0, ii = addressBook.addresses.length; i < ii; i++) {
            result.push(new AddressModel(addressBook.addresses[i].raw).address);
        }
    }

    return result;
}

function account(currentCustomer, addressModel, orderModel) {
    module.superModule.call(this, currentCustomer, addressModel, orderModel);
    this.addresses = getAddresses(currentCustomer.addressBook);
}

module.exports = account;