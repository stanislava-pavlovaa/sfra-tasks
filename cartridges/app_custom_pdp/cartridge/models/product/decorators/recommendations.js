'use strict';

function getProductRecommendations(product) {
    var productIds = [];
    for (let i = 0; i < product.length; i++) {
        productIds.push(product[i]);
    }
    return productIds;
}

module.exports = function (object, product) {
    Object.defineProperty(object, 'recommendations', {
        enumerable: true,
        value: product.custom.recommendations ? getProductRecommendations(product.custom.recommendations) : null
    });
};