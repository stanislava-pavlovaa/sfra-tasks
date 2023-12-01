'use strict';

/**
 * @namespace ProductSubscription
 */

var server = require('server');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var csrfProtection = require("*/cartridge/scripts/middleware/csrf");

server.get('Show', server.middleware.https, consentTracking.consent, csrfProtection.generateToken, function (req, res, next) {
   
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

module.exports = server.exports();
