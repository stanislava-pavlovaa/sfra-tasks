'use strict';
var base = require('base/product/detail');

const addToCart = '.add-to-cart';
const addToCartMessages = '.js-add-to-cart-messages';
const productSubscription = '.js-product-subscription';
const subscriptionForm = '.js-subscriptionForm'
const phoneVerificationForm = '.js-phone-verification';

base.updateAttribute = function () {
    $('body').on('product:afterAttributeSelect', function (e, response) {
        if (response.data.product.available) {
            $(addToCart).removeClass('d-none');
            $(productSubscription).addClass('d-none');
        } else {
            $(addToCart).addClass('d-none');
            $(productSubscription).removeClass('d-none');
        }

        $('.subscriptionProductId').val(response.data.product.id);

        if ($('.product-detail>.bundle-items').length) {
            response.container.data('pid', response.data.product.id);
            response.container.find('.product-id').text(response.data.product.id);
        } else if ($('.product-set-detail').eq(0)) {
            response.container.data('pid', response.data.product.id);
            response.container.find('.product-id').text(response.data.product.id);
        } else {
            $('.product-id').text(response.data.product.id);
            $('.product-detail:not(".bundle-item")').data('pid', response.data.product.id);
        }
    });
}

base.subscribe = function () {
    $(document).ready(function() {
        $(subscriptionForm).submit(function (e) {
            e.preventDefault();

            var formData = $(this).serialize();

            $.spinner().start();

            $.ajax({
                url: $(this).attr('action'),
                type: 'post',
                data: formData,
                success: function (data) {
                    $.spinner().stop();
                    if (data.error) {
                        $(addToCartMessages).removeClass('d-none alert-success').addClass('alert-danger').html(data.errorMessage);
                        setTimeout(function () {
                            $(addToCartMessages).addClass('d-none');
                        }, 3000);
                    } else {
                        if (data.showPhoneVerificationForm){
                            $(phoneVerificationForm).removeClass('d-none');
                            $(subscriptionForm).addClass('d-none');
                        }
                        $(addToCartMessages).removeClass('d-none alert-danger').addClass('alert-success').html(data.msgSuccess);
                        setTimeout(function () {
                            $(addToCartMessages).addClass('d-none');
                        }, 2000);
                    }
                },
                error: function () {
                    $.spinner().stop();
                }
            });
        });
    })
}

base.verifyPhone = function () {
    $(document).ready(function() {
        $('.js-phone-verification').submit(function (e) {
            e.preventDefault();

            var formData = $(this).serialize();

            $.spinner().start();

            $.ajax({
                url: $(this).attr('action'),
                type: 'post',
                data: formData,
                success: function (data) {
                    $.spinner().stop();
                    if (data.error) {
                        $(addToCartMessages).removeClass('d-none alert-success').addClass('alert-danger').html(data.errorMessage);
                        setTimeout(function () {
                            $(addToCartMessages).addClass('d-none');
                        }, 3000);
                    } else {
                        $(phoneVerificationForm).addClass('d-none');
                        $(subscriptionForm).removeClass('d-none');
                        $(addToCartMessages).removeClass('d-none alert-danger').addClass('alert-success').html(data.msgSuccess);
                        setTimeout(function () {
                            $(addToCartMessages).addClass('d-none');
                        }, 2000);
                    }
                },
                error: function () {
                    $.spinner().stop();
                }
            });
        });
    })
}

module.exports = base;