"use strict";

var server = require("server");
server.extend(module.superModule);

var csrfProtection = require("*/cartridge/scripts/middleware/csrf");

server.append("Show", function (req, res, next) {
    var ProductMgr = require('dw/catalog/ProductMgr');

    var viewData = res.getViewData();

    var outOfStockForm = server.forms.getForm("outOfStock");
    outOfStockForm.clear();

    var phone = customer.profile ? customer.profile.phoneHome : "";

    viewData.outOfStockForm = outOfStockForm;
    viewData.phone = phone;

    res.setViewData(viewData);
    next();
});

/**
 * Product-Subscribe : The Product-Subscribe endpoint is the endpoint that gets hit when a shopper has subscribed for Product
 * @name Base/Product-SubscribeProfile
 * @function
 * @memberof Product
 * @param {middleware} - server.middleware.https
 * @param {middleware} - csrfProtection.validateAjaxRequest
 * @param {httpparameter} - csrf_token - hidden input field CSRF token
 * @param {category} - sensititve
 * @param {returns} - json
 * @param {serverfunction} - post
 */
server.post(
    "Subscribe",
    server.middleware.https,
    csrfProtection.validateAjaxRequest,
    function (req, res, next) {
        var CustomObjectMgr = require("dw/object/CustomObjectMgr");
        var Resource = require("dw/web/Resource");
        var Transaction = require("dw/system/Transaction");
        var URLUtils = require("dw/web/URLUtils");
        var outOfStockForm = server.forms.getForm("outOfStock");
        var OUT_OF_STOCK_SUBSCRIPTION_CO = "OUT_OF_STOCK_SUBSCRIPTION";
        
        
        if (outOfStockForm.valid) {
            var subscriptionEntry = CustomObjectMgr.getCustomObject(OUT_OF_STOCK_SUBSCRIPTION_CO, outOfStockForm.productID.value);

            Transaction.wrap(function () {
                if (!subscriptionEntry) {
                    subscriptionEntry = CustomObjectMgr.createCustomObject(OUT_OF_STOCK_SUBSCRIPTION_CO, outOfStockForm.productID.value);
                    subscriptionEntry.custom.phoneNumbers = [outOfStockForm.phone.value];
                } else {
                    var phoneNumbersArray = Array.from(subscriptionEntry.custom.phoneNumbers);
                    var currentPhone = outOfStockForm.phone.value;
                    if (phoneNumbersArray.includes(currentPhone)) {
                        res.json({
                            success: false,
                            error:true,
                            errorMessage: Resource.msg('error.message.already.subscribed', 'subscription', null)
                        })
                    } else {
                        phoneNumbersArray.push(currentPhone);
                        subscriptionEntry.custom.phoneNumbers = phoneNumbersArray
                        res.json({
                            success: true,
                            error: false,
                            msgSuccess: Resource.msg('success.message.subscribed', 'subscription', null)
                        })
                    }
                }
            });
        } else {
            res.json({
                    success: false,
                    error: true,
                    errorMessage: Resource.msg('error.message.invalid.phone', 'subscription', null)
            });
        }

        return next();
    }
);

module.exports = server.exports();
