"use strict";

var server = require("server");
server.extend(module.superModule);

server.append("Show", function (req, res, next) {
    var viewData = res.getViewData();
    
    var shippingInfo = viewData.product.shippingInformation;
    viewData.shippingInfo = shippingInfo;
    
    res.setViewData(viewData);
    next();
});

module.exports = server.exports();