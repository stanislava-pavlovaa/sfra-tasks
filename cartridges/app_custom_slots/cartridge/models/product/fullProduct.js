'use strict';

var base = module.superModule;
var shipping = require('*/cartridge/models/product/decorators/shipping');

/**
 * Decorate product with product line item information
 * @param {Object} product - Product Model to be decorated
 * @param {dw.catalog.Product} apiProduct - Product information returned by the script API
 * @param {Object} options - Options passed in from the factory
 * @returns {Object} - Decorated product model
 */
module.exports = function fullProduct(product, apiProduct, options) {
    base.call(this, product, apiProduct, options);
    shipping(product, apiProduct);

    return product;
}
