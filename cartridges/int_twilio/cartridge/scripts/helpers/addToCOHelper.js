var CustomObjectMgr = require("dw/object/CustomObjectMgr");
var Transaction = require("dw/system/Transaction");
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
