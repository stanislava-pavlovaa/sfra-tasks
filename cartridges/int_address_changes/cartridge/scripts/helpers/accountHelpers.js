"use strict";

var base = module.superModule;

/**
 * Gets the verify account token of a customer
 * @param {Object} customer - the customer creating new account
 * @returns {string} verify account token
 */
function getVerifyAccountToken(customer) {
    var Transaction = require("dw/system/Transaction");
    var CustomerMgr = require("dw/customer/CustomerMgr");
    var verifyingCustomer = CustomerMgr.getCustomerByLogin(customer.email);

    var verifyAccountToken;
    Transaction.wrap(function () {
        verifyAccountToken = customer.credentials.createResetPasswordToken();
    });

    return verifyAccountToken;
}

/**
 * Send an email that would notify the user that account was created
 * @param {obj} registeredUser - object that contains user's email address and name information.
 */
base.sendCreateAccountEmail = function (registeredUser) {
    var emailHelpers = require("*/cartridge/scripts/helpers/emailHelpers");
    var Site = require("dw/system/Site");
    var Resource = require("dw/web/Resource");
    var URLUtils = require("dw/web/URLUtils");

    var verifyAccountToken = getVerifyAccountToken(registeredUser);
    var url = URLUtils.https("Account-VerifyAccount", "Token", verifyAccountToken);

    var userObject = {
        email: registeredUser.email,
        firstName: registeredUser.firstName,
        lastName: registeredUser.lastName,
        verifyAccountToken: verifyAccountToken,
        url: url
    };

    var emailObj = {
        to: registeredUser.email,
        subject: Resource.msg("email.subject.new.registration", "registration", null),
        from: Site.current.getCustomPreferenceValue("customerServiceEmail") || "no-reply@testorganization.com",
        type: emailHelpers.emailTypes.registration
    };

    emailHelpers.sendEmail(emailObj, "checkout/confirmation/accountRegisteredEmail", userObject);
};

module.exports = base;
