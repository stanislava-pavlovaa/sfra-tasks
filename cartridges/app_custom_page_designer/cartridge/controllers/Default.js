'use strict';

var server = require("server");
server.extend(module.superModule);

var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');

server.append('Start', function (req, res, next) {
    var Site = require('dw/system/Site');
    var PageMgr = require('dw/experience/PageMgr');
    var pageMetaHelper = require('*/cartridge/scripts/helpers/pageMetaHelper');

    pageMetaHelper.setPageMetaTags(req.pageMetaData, Site.current);

    var page = PageMgr.getPage("christmas-homepage");

    if (page && page.isVisible()) {
        res.page("christmas-homepage");
    } else {
        res.render('home/homePage');
    }
    next();
}, pageMetaData.computedPageMetaData);

module.exports = server.exports();
