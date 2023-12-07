var errorNotification = require('base/components/errorNotification');

function verifyReCaptcha(token) {
    const form = $('.js-registration-form');
    const submitBtn = form.find('.js-registration-btn-submit');
    const verifyUrl = submitBtn.data('verify-url');
    const errorMessage = '.js-reCaptcha-error-message';

    $.spinner().start();

    $.ajax({
        url: verifyUrl,
        type: 'post',
        dataType: 'json',
        data: { token },
        success: function (data) {
            form.trigger('submit')
            $.spinner().stop()
        },
        error: function (err) 
        {
            errorNotification($(errorMessage), err.responseJSON.message);
            $.spinner().stop()
        }
    });
}

window.verifyReCaptcha = verifyReCaptcha;