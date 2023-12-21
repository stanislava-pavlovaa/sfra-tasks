'use strict';

module.exports = function (object, product) {
    Object.defineProperty(object, 'deliveryInfoAsset', {
        enumerable: true,
        value: product.custom.deliveryInfoAsset ? product.custom.deliveryInfoAsset : null
    });
};