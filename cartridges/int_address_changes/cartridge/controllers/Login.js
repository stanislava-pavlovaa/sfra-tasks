'use strict';

var server = require('server');
server.extend(module.superModule);

var reCaptchaConfig = require("~/cartridge/scripts/middleware/reCaptcha");

/**
 * Login-Show : This endpoint is called to attach reCaptcha
 * @name Base/Login-Show
 * @function
 * @memberof Login
 * @param {category} - sensitive
 * @param {serverfunction} - get
 */
server.append('Show', reCaptchaConfig.configureReCaptcha);

module.exports = server.exports();