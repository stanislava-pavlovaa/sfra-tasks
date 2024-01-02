"use strict";

var server = require("server");
server.extend(module.superModule);

var csrfProtection = require("*/cartridge/scripts/middleware/csrf");
var productSubscriptionHelper = require('~/cartridge/scripts/helpers/productSubscriptionHelper');

/**
 * Product-Subscribe : The Product-Subscribe endpoint is the endpoint that gets hit when a shopper has subscribed for Product
 * @name Base/Product-Subscribe
 * @function
 * @memberof Product
 * @param {middleware} - server.middleware.https
 * @param {middleware} - csrfProtection.validateAjaxRequest
 * @param {returns} - json
 * @param {serverfunction} - post
 */
server.post(
    "Subscribe",
    server.middleware.https,
    csrfProtection.validateAjaxRequest,
    function (req, res, next) {
        var Site = require('dw/system/Site');

        var outOfStockForm = server.forms.getForm("outOfStock");

        var phone = outOfStockForm.phone.value;
        var productId = outOfStockForm.productID.value;
        var twilioPhone = Site.getCurrent().getCustomPreferenceValue("twilioPhoneNumber");
        var response = productSubscriptionHelper.handleSubscribeRequest(outOfStockForm, productId, phone, twilioPhone);

        res.json(response);

        return next();
    }
);

/**
 * Product-VerifyPhone : The Product-VerifyPhone endpoint is the endpoint that gets hit when a shopper has verified his phone
 * @name Base/Product-VerifyPhone
 * @function
 * @memberof Product
 * @param {middleware} - server.middleware.https
 * @param {middleware} - csrfProtection.validateAjaxRequest
 * @param {returns} - json
 * @param {serverfunction} - post
 */
server.post("VerifyPhone", server.middleware.https, csrfProtection.validateAjaxRequest, function (req, res, next) {
    var phoneVerificationForm = server.forms.getForm("phoneVerification");

    var code = phoneVerificationForm.verificationCode.value;
    var productId = phoneVerificationForm.productID.value;
    var response = productSubscriptionHelper.handlePhoneVerificationRequest(code, productId);

    res.json(response);

    return next();
});

module.exports = server.exports();
