"use strict";

var LocalServiceRegistry = require("dw/svc/LocalServiceRegistry");
var StringUtils = require('dw/util/StringUtils');
var Resource = require('dw/web/Resource');

function subscribe(customerPhone, twilioPhone, productName) {
    var service = LocalServiceRegistry.createService("http.twilio.service", {
        createRequest: function (svc, args) {
            svc.setRequestMethod("POST");
            svc.addHeader('Content-Type', 'application/x-www-form-urlencoded');
            return args;
        },

        parseResponse: function (svc, client) {
            return client.text;
        },

        filterLogMessage: function (msg) {
            return msg;
        },
    });

    var message = StringUtils.format(Resource.msg('product.in.stock', 'subscription', null), productName)
    var requestBody = `To=${customerPhone}&From=${twilioPhone}&Body=${message}`;
    var response = service.call(requestBody).object

    return response;
}

module.exports = {
    subscribe: subscribe,
};
