function verifyReCaptcha(token) {
    console.log(token);
    const $form = $('.js-registration-form');
    const $submitBtn = $form.find('.js-registration-btn-submit');
    const $verifyUrl = $submitBtn.data('verify-url');

    $.spinner().start();

    $.ajax({
        url: $verifyUrl,
        type: 'post',
        dataType: 'json',
        data: { token },
        success: function (data) {
            $form.trigger('submit')
            $.spinner().stop()
        },
        error: function (err) 
        {
            $.spinner().stop()
        }
    });
}

window.verifyReCaptcha = verifyReCaptcha;