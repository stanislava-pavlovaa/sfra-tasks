'use strict';

/**
 * @namespace ProductSubscription
 */

var server = require('server');
var csrfProtection = require("*/cartridge/scripts/middleware/csrf");

/**
 * ProductSubscription-Show : The ProductSubscription-Show endpoint renders product subscription form. This form allows the shopper to subscribe for a product that is out of stock
 * @name Base/ProductSubscription-Show
 * @function
 * @memberof ProductSubscription
 * @param {middleware} - server.middleware.include
 * @param {httpparameter} - csrf_token - hidden input field CSRF token
 * @param {returns} - isml
 * @param {serverfunction} - get
 */
server.get('Show', server.middleware.include, csrfProtection.generateToken, function (req, res, next) {
   
    var outOfStockForm = server.forms.getForm("outOfStock");
    outOfStockForm.clear();

    var productId = req.querystring.pid;
    var phone = customer.profile ? customer.profile.phoneHome : "";
    
    res.render("product/components/outOfStock", {
        outOfStockForm: outOfStockForm,
        productId: productId,
        phone: phone
    });
    next();
});

/**
 * ProductSubscription-PhoneVerification : The ProductSubscription-PhoneVerification endpoint renders form for phone verification.
 * @name Base/ProductSubscription-PhoneVerification
 * @function
 * @memberof ProductSubscription
 * @param {middleware} - server.middleware.include
 * @param {httpparameter} - csrf_token - hidden input field CSRF token
 * @param {returns} - isml
 * @param {serverfunction} - get
 */
server.get('PhoneVerification', server.middleware.include, csrfProtection.generateToken, function (req, res, next) {
   
    var phoneVerificationForm = server.forms.getForm("phoneVerification");
    phoneVerificationForm.clear();

    var productId = req.querystring.pid;
    
    res.render("product/components/phoneVerification", {
        phoneVerificationForm: phoneVerificationForm,
        productId: productId,
    });
    next();
});

module.exports = server.exports();
