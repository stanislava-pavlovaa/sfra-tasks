'use strict';

var server = require('server');

var reCaptchaConfig = require("~/cartridge/scripts/middleware/reCaptcha");

server.post('Verify', server.middleware.https, reCaptchaConfig.configureReCaptcha, function (req, res, next) {
    var Resource = require('dw/web/Resource');
    var errorMsg = Resource.msg('error.message.account.create.error', 'forms', null);

    var token = req.form.token

    if (!token) {
        res.json({
            success: false,
            errorMessage: errorMsg
        })

        return next();
    }

    var reCaptchaConfig = res.getViewData().reCaptcha;

    var reCaptchaService = require("~/cartridge/scripts/services/reCaptchaService");
    var response = reCaptchaService.call({ token: token, secret: reCaptchaConfig.secretKey }).object;

    var siteThreshold = reCaptchaConfig.threshold;

    if (response.score >= siteThreshold) {
        res.json({
            success: true
        });
    } else {
        res.json({
            success: false,
            errorMessage: errorMsg
        })
    }

    return next();
})

module.exports = server.exports();