'use strict';

module.exports = function (object, product) {
    Object.defineProperty(object, 'shipping', {
        enumerable: true,
        value: product.custom.shipping ? product.custom.shipping : null
    });
};
