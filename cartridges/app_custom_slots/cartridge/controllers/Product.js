"use strict";

var server = require("server");
server.extend(module.superModule);

server.append("Show", function (req, res, next) {
    var Resource = require('dw/web/Resource');
    var ContentMgr = require("dw/content/ContentMgr");
    var asset = ContentMgr.getContent("product-information");

    if (asset && asset.custom.body) {
        var viewData = res.getViewData();
        var assetBody = asset.custom.body.toString();

        if (viewData.product.shipping) {
            var shippingInfo = viewData.product.shipping;
            assetBody = assetBody.replace("{shipping}", shippingInfo);
        } else {
            assetBody = assetBody.replace("{shipping}", Resource.msg('shipping.no.information', 'product', null));
        }

        viewData.assetBody = assetBody;
        res.setViewData(viewData);
    }
    next();
});

module.exports = server.exports();