var Transaction = require("dw/system/Transaction");

var productSubscriptionHelper = require('~/cartridge/scripts/helpers/customObjectHelper.js')
var twilioService = require("~/cartridge/scripts/twilioService.js");

function addToCO(customObjectType, productID, phone) {
    var subscriptionEntry = productSubscriptionHelper.getCustomObject(customObjectType, productID);
    var response = {
        createdObject: false,
        phoneExists: false,
        success: false,
    };

    Transaction.wrap(function () {
        if (!subscriptionEntry) {
            subscriptionEntry = productSubscriptionHelper.createCustomObject(customObjectType, productID);
            subscriptionEntry.custom.phoneNumbers = [phone];
            response.createdObject = true;
            response.success = true;
        } else {
            var phoneNumbersArray = Array.from(subscriptionEntry.custom.phoneNumbers);
    
            if (phoneNumbersArray.includes(phone)) {
               response.phoneExists = true;
               response.success = false;
            } else {
                phoneNumbersArray.push(phone);
                subscriptionEntry.custom.phoneNumbers = phoneNumbersArray;
                response.phoneExists = false;
                response.success = true;
            }
        }
    });

    return response;
}

module.exports = { addToCO: addToCO };
