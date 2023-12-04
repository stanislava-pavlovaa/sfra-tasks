"use strict";

var Resource = require("dw/web/Resource");
var ContentMgr = require("dw/content/ContentMgr");

module.exports = function (object, product) {
    Object.defineProperty(object, "shipping", {
        enumerable: true,
        value: product.custom.shipping ? product.custom.shipping : null,
    });
    Object.defineProperty(object, "shippingInformation", {
        enumerable: true,
        value: (function() {
            var asset = ContentMgr.getContent("product-information");

            if (asset && asset.custom.body && asset.online) {
                var assetBody = asset.custom.body.toString();
                if (product.custom.shipping) {
                    var shippingInfo = product.custom.shipping;
                    assetBody = assetBody.replace("{shipping}", shippingInfo);
                } else {
                    assetBody = assetBody.replace("{shipping}", Resource.msg("shipping.no.information", "product", null));
                }
                return assetBody;
            }
        }())
    });
};
