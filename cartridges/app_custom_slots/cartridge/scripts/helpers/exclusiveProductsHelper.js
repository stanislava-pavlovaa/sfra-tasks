'use strict';

/**
 * Helper function that gets exclusive products from content asset
 */

function getExclusiveProducts() {
    var ProductMgr = require('dw/catalog/ProductMgr');
    var ContentMgr = require("dw/content/ContentMgr");
    var asset = ContentMgr.getContent("exclusive-products");

    if (asset && asset.custom.body) {
        var assetBody = asset.custom.body.toString();
        var products = assetBody.match(/\{([^}]+)\}/g);
        var productIDs = products.map((item) => item.match(/\{([^{}\s]+)\}/)[1]);

        var products = [];

        productIDs.forEach(el => {
            products.push(ProductMgr.getProduct(el));
        });
        return products;
    }
}

module.exports = {
    getExclusiveProducts: getExclusiveProducts
};
