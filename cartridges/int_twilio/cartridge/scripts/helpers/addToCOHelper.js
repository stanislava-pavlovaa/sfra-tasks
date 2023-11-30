var CustomObjectMgr = require("dw/object/CustomObjectMgr");
var Resource = require("dw/web/Resource");
var Transaction = require("dw/system/Transaction");
var URLUtils = require("dw/web/URLUtils");
var OUT_OF_STOCK_SUBSCRIPTION_CO = "OUT_OF_STOCK_SUBSCRIPTION";

function addToCO(productID, phone) {
    var subscriptionEntry = CustomObjectMgr.getCustomObject(OUT_OF_STOCK_SUBSCRIPTION_CO, productID);
    var response = {
        createdObject: false,
        phoneExists: false,
        success: false,
    };

    Transaction.wrap(function () {
        if (!subscriptionEntry) {
            subscriptionEntry = CustomObjectMgr.createCustomObject(OUT_OF_STOCK_SUBSCRIPTION_CO, productID);
            subscriptionEntry.custom.phoneNumbers = [phone];
            response.createdObject = true;
            response.success = true;
        } else {
            var phoneNumbersArray = Array.from(subscriptionEntry.custom.phoneNumbers);
            var currentPhone = phone;
            if (phoneNumbersArray.includes(currentPhone)) {
               response.phoneExists = true;
               response.success = false;
            } else {
                phoneNumbersArray.push(currentPhone);
                subscriptionEntry.custom.phoneNumbers = phoneNumbersArray;
                response.phoneExists = false;
                response.success = true;
            }
        }
    });

    return response;
}

module.exports = { addToCO: addToCO };
