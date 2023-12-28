"use strict";

var LocalServiceRegistry = require("dw/svc/LocalServiceRegistry");

var reCaptchaService = LocalServiceRegistry.createService("http.reCAPTCHA.service", {
    createRequest: function (svc, args) {
        svc.setRequestMethod("POST");
        svc.addHeader("Content-Type", "application/x-www-form-urlencoded");

        return `secret=${args.secret}&response=${args.token}`;
    },

    parseResponse: function (svc, client) {
        let result;

        try {
            result = JSON.parse(client.text);
        } catch(e) {
            result = client.text;
        }
        return result;
    },
});

module.exports = reCaptchaService;
