'use strict';

var base = module.superModule;

var URLUtils = require('dw/web/URLUtils');

/**
 * Send an email that would notify the user that account was created
 * @param {obj} registeredUser - object that contains user's email address and name information.
 */
function sendCreateAccountEmail(registeredUser) {
    var emailHelpers = require('*/cartridge/scripts/helpers/emailHelpers');
    var products = require('*/cartridge/scripts/helpers/exclusiveProductsHelper');
    var Site = require('dw/system/Site');
    var Resource = require('dw/web/Resource');

    var userObject = {
        email: registeredUser.email,
        firstName: registeredUser.firstName,
        lastName: registeredUser.lastName,
        products: products.getExclusiveProducts(),
        url: URLUtils.https('Login-Show')
    };

    var emailObj = {
        to: registeredUser.email,
        subject: Resource.msg('email.subject.new.registration', 'registration', null),
        from: Site.current.getCustomPreferenceValue('customerServiceEmail') || 'no-reply@testorganization.com',
        type: emailHelpers.emailTypes.registration
    };

    emailHelpers.sendEmail(emailObj, 'checkout/confirmation/accountRegisteredEmail', userObject);
}

base.sendCreateAccountEmail = sendCreateAccountEmail;

module.exports = base;