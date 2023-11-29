'use strict';
var base = require('base/product/detail');

base.updateAttribute = function () {
    $('body').on('product:afterAttributeSelect', function (e, response) {
        console.log(response);

        if (response.data.product.available) {
            $('.add-to-cart').removeClass('d-none');
            $('.product-subscription').addClass('d-none');
        } else {
            $('.add-to-cart').addClass('d-none');
            $('.product-subscription').removeClass('d-none');
        }

        $('.subscriptionProductId').val(response.data.product.id);
        console.log($('.subscriptionProductId').val());

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
        $('.subscriptionForm').submit(function (e) {
            e.preventDefault();

            var formData = $(this).serialize();

            $.spinner().start();

            $.ajax({
                url: $(this).attr('action'),
                type: 'post',
                data: formData,
                success: function (data) {
                    console.log(data);
                    $.spinner().stop();

                    if (data.error) {
                        $('.add-to-cart-messages').append(
                            '<div class="alert alert-danger add-to-basket-alert text-center"'
                            + ' role="alert">'
                            + data.errorMessage + '</div>'
                        );
                        setTimeout(function () {
                            $('.add-to-basket-alert').remove();
                        }, 3000);
                    } else {
                        $('.add-to-cart-messages').append(
                            '<div class="alert alert-success add-to-basket-alert text-center"'
                            + ' role="alert">'
                            + data.msgSuccess + '</div>'
                        );
                        setTimeout(function () {
                            $('.add-to-basket-alert').remove();
                        }, 1500);
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