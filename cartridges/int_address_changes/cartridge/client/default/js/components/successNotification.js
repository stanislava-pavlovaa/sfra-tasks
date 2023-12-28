'use strict';

module.exports = function (element, message) {
    var successHtml = '<div class="alert alert-success alert-dismissible ' +
        'fade show" role="alert">' +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
        '<span aria-hidden="true">&times;</span>' +
        '</button>' + message + '</div>';

    $(element).append(successHtml);
};
