'use strict';

/**
 * Helper function that gets exclusive products from content asset
 */

function getExclusiveProducts() {
    var ProductFactory = require('*/cartridge/scripts/factories/product');
    var ContentMgr = require("dw/content/ContentMgr");
    var asset = ContentMgr.getContent("exclusive-products");

    if (asset && asset.custom.body) {
        var assetBody = asset.custom.body.toString();
        var products = assetBody.match(/\{([^}]+)\}/g);
        var productIDs = products.map((item) => item.match(/\{([^{}\s]+)\}/)[1]);

        var products = [];

        productIDs.forEach(id => {
            products.push(ProductFactory.get({pid: id, pview: 'tile'}));
        });
        return products;
    }
}

module.exports = {
    getExclusiveProducts: getExclusiveProducts
};
