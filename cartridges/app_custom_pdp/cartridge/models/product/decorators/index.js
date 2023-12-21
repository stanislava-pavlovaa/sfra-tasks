"use strict";

var base = module.superModule;

base.deliveryInfoAsset = require('*/cartridge/models/product/decorators/delivery');
base.recommendations = require('*/cartridge/models/product/decorators/recommendations');

module.exports = base;