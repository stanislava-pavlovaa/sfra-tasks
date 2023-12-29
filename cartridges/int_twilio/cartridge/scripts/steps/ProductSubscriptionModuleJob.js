var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var ProductMgr = require('dw/catalog/ProductMgr');
var Transaction = require('dw/system/Transaction');
var Resource = require('dw/web/Resource');
var StringUtils = require('dw/util/StringUtils');
var Logger = require('dw/system/Logger');
var Site = require('dw/system/Site');

var twilioService = require("~/cartridge/scripts/twilioService.js");

module.exports.execute = function () {
    var subscriptionIterator = CustomObjectMgr.getAllCustomObjects("OUT_OF_STOCK_SUBSCRIPTION");
    var twilioPhone = Site.getCurrent().getCustomPreferenceValue("twilioPhoneNumber");
    var response;

    try {
        while (subscriptionIterator.hasNext()) {
            var subscriptionObj = subscriptionIterator.next();
            var productId = subscriptionObj.custom.productID;
            var phoneNumbers = subscriptionObj.custom.phoneNumbers;
            var product = ProductMgr.getProduct(productId);

            if (product.availabilityModel.inStock && phoneNumbers) {
                phoneNumbers.forEach(customerPhone => {
                    var message = StringUtils.format(Resource.msg('product.in.stock', 'subscription', null), product.name)
                    response = twilioService.subscribe(customerPhone, twilioPhone, message);
                });
                
                if (response) {
                    try {
                        Transaction.wrap(function () {
                            CustomObjectMgr.remove(subscriptionObj);
                         });
                     } catch (err) {
                         Logger.error(Resource.msg('custom.object.error', 'subscription', null), err.message);
                     }
                }
            }
        }
    } catch (err) {
        Logger.error(Resource.msg('subscription.job.error', 'subscription', null), err.message);
    }
}
