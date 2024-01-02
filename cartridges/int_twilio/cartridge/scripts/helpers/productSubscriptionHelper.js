var Transaction = require("dw/system/Transaction");
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var Resource = require("dw/web/Resource");

var productSubscriptionHelper = require('~/cartridge/scripts/helpers/customObjectHelper.js');
var twilioService = require("~/cartridge/scripts/twilioService.js");

var OUT_OF_STOCK_SUBSCRIPTION_CO = "OUT_OF_STOCK_SUBSCRIPTION";
var PHONE_VERIFICATION_CO = 'PHONE_VERIFICATION';

function addToOutOfStockCO(customObjectType, productID, phone) {
    var subscriptionEntry = productSubscriptionHelper.getCustomObject(customObjectType, productID);
    var response = {
        createdObject: false,
        phoneExists: false,
        success: false,
    };

    var isPhoneExisting = isPhoneNumberExisting(OUT_OF_STOCK_SUBSCRIPTION_CO, productID, phone);

    Transaction.wrap(function () {
        if (!subscriptionEntry) {
            subscriptionEntry = productSubscriptionHelper.createCustomObject(customObjectType, productID);
            subscriptionEntry.custom.phoneNumbers = [phone];
            response.createdObject = true;
            response.success = true;
        } else {
            var phoneNumbersArray = Array.from(subscriptionEntry.custom.phoneNumbers);
    
            if (isPhoneExisting) {
               response.phoneExists = true;
               response.success = false;
            } else {
                phoneNumbersArray.push(phone);
                subscriptionEntry.custom.phoneNumbers = phoneNumbersArray;
                response.phoneExists = false;
                response.success = true;
            }
        }
    });

    return response;
}

function isPhoneNumberVerified(phoneNumber) {
    var iteratorOfSubscriptions = CustomObjectMgr.queryCustomObjects(
        OUT_OF_STOCK_SUBSCRIPTION_CO,
        `custom.phoneNumbers LIKE '${phoneNumber}'`,
        null
    );
    return iteratorOfSubscriptions.count > 0;
};

function isPhoneNumberExisting (customObject, productID, phoneNumber) {
    var subscriptionEntry = productSubscriptionHelper.getCustomObject(customObject, productID);

    return subscriptionEntry ? subscriptionEntry.custom.phoneNumbers.includes(phoneNumber) : false;
};

function saveVerificationCode(phoneNumber) {
    var UUIDUtils = require("dw/util/UUIDUtils");
    var Calendar = require('dw/util/Calendar');
    var verificationCode = UUIDUtils.createUUID().slice(0, 6);

    var objectCreated = false;
    
    Transaction.wrap(() => {
        var verificationCodeObject = CustomObjectMgr.createCustomObject(
            PHONE_VERIFICATION_CO,
            verificationCode
        );
        verificationCodeObject.custom.phoneNumbers = phoneNumber;

        var currentDate = new Date();
        currentDate.setMinutes(currentDate.getMinutes() + 15);
        verificationCodeObject.custom.expirationTime = new Calendar(currentDate).time;

        if (verificationCodeObject) {
            objectCreated = true;
        }
    });

    return objectCreated ? verificationCode : false;
};

function isCodeExpired(expirationDate) {
    var currentDate = new Date();
    return currentDate >= expirationDate;
};

function handleSubscribeRequest(form, productId, phone, twilioPhone) {
    var StringUtils = require('dw/util/StringUtils');
    var twilioService = require("~/cartridge/scripts/twilioService.js");
    
    var isPhoneVerified = isPhoneNumberVerified(phone);

    if (isPhoneVerified) {
        var addToCOResponse = addToOutOfStockCO(OUT_OF_STOCK_SUBSCRIPTION_CO, productId, phone);

        if (addToCOResponse.success && (addToCOResponse.createdObject || !addToCOResponse.phoneExists)) {
            return {
                success: true,
                error: false,
                msgSuccess: Resource.msg('success.message.subscribed', 'subscription', null)
            };
        } else if (!addToCOResponse.success && addToCOResponse.phoneExists) {
            return {
                success: false,
                error: true,
                errorMessage: Resource.msg('error.message.already.subscribed', 'subscription', null)
            };
        }
    } else {
        var verificationCode = saveVerificationCode(phone);

        var message = StringUtils.format(Resource.msg('verification.code.message', 'subscription', null), verificationCode);
        var response = twilioService.subscribe(phone, twilioPhone, message);

        if (response.ok) {
            return {
                showPhoneVerificationForm: true,
                success: true,
                error: false,
                msgSuccess: 'Successfully sent code!'
            };
        } else {
            return {
                success: false,
                error: true,
                errorMessage: 'Failed to send code!'
            };
        }
    }
}

function handlePhoneVerificationRequest(code, productId) {
    var verificationCodeEntry = productSubscriptionHelper.getCustomObject(PHONE_VERIFICATION_CO, code);

    if (verificationCodeEntry) {
        var isExpired = isCodeExpired(verificationCodeEntry.custom.expirationTime);

        if (isExpired) {
            return {
                success: false,
                error: true,
                errorMessage: Resource.msg(
                    "error.message.code.expired",
                    "subscription",
                    null
                ),
            };
        }

        var phoneNumber = verificationCodeEntry.custom.phoneNumbers;
        var isPhoneExisting = isPhoneNumberExisting(PHONE_VERIFICATION_CO, productId, phoneNumber);

        if (!isPhoneExisting){
            addToOutOfStockCO(OUT_OF_STOCK_SUBSCRIPTION_CO, productId, phoneNumber)
        }

        Transaction.wrap(function () {
            CustomObjectMgr.remove(verificationCodeEntry);
        });

        return {
            success: true,
            error: false,
            msgSuccess: Resource.msg('success.message.subscribed', 'subscription', null)
        };
    }

    return {
        success: false,
        error: true,
        errorMessage: Resource.msg(
            "error.message.enter.valid.code",
            "subscription",
            null
        ),
    };
};

module.exports = { 
    handleSubscribeRequest,
    handlePhoneVerificationRequest
};
