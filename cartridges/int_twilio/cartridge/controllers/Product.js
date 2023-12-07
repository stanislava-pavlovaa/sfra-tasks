"use strict";

var server = require("server");
server.extend(module.superModule);

var csrfProtection = require("*/cartridge/scripts/middleware/csrf");

/**
 * Product-Subscribe : The Product-Subscribe endpoint is the endpoint that gets hit when a shopper has subscribed for Product
 * @name Base/Product-Subscribe
 * @function
 * @memberof Product
 * @param {middleware} - server.middleware.https
 * @param {middleware} - csrfProtection.validateAjaxRequest
 * @param {httpparameter} - csrf_token - hidden input field CSRF token
 * @param {returns} - json
 * @param {serverfunction} - post
 */
server.post(
    "Subscribe",
    server.middleware.https,
    csrfProtection.validateAjaxRequest,
    function (req, res, next) {
        var Resource = require("dw/web/Resource");
        var productSubscriptionHelper = require('~/cartridge/scripts/helpers/productSubscriptionHelper');
        var OUT_OF_STOCK_SUBSCRIPTION_CO = "OUT_OF_STOCK_SUBSCRIPTION";

        var outOfStockForm = server.forms.getForm("outOfStock");

        if (outOfStockForm.valid) {
            var addToCOResponse = productSubscriptionHelper.addToCO(OUT_OF_STOCK_SUBSCRIPTION_CO, outOfStockForm.productID.value, outOfStockForm.phone.value);

            if (addToCOResponse.success && addToCOResponse.createdObject) {
                res.json({
                    success: true,
                    error: false,
                    msgSuccess: Resource.msg('success.message.subscribed', 'subscription', null)
                })
            }  else if (addToCOResponse.success && !addToCOResponse.phoneExists) {
                res.json({
                    success: true,
                    error: false,
                    msgSuccess: Resource.msg('success.message.subscribed', 'subscription', null)
                })
            } else if(!addToCOResponse.success && addToCOResponse.phoneExists){
                res.json({
                    success: false,
                    error:true,
                    errorMessage: Resource.msg('error.message.already.subscribed', 'subscription', null)
                })
            }
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
