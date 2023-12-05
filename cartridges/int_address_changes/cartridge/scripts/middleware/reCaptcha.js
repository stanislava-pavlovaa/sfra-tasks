function configureReCaptcha(req, res, next) {
    var URLUtils = require('dw/web/URLUtils');
    var Site = require('dw/system/Site');

    var { reCaptchaSiteKey, reCaptchaSecretKey, reCaptchaThreshold } = Site.getCurrent().getPreferences().custom;

    var reCaptchaConfig = {
        siteKey: reCaptchaSiteKey,
        threshold: reCaptchaThreshold,
        secretKey: reCaptchaSecretKey,
        verifyUrl: URLUtils.url('ReCaptcha-Verify')
    };

    var viewData = res.getViewData();
    viewData.reCaptcha = reCaptchaConfig;

    res.setViewData(viewData);

    next();
}

module.exports = {
    configureReCaptcha : configureReCaptcha,
};