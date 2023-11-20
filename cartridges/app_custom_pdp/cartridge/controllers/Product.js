"use strict";

var server = require("server");
server.extend(module.superModule);

server.append("Show", function (req, res, next) {
    var viewData = res.getViewData();

    var ContentMgr = require("dw/content/ContentMgr");
    var asset = ContentMgr.getContent("promotional-message");
    
    if (asset && asset.custom.body && asset.online) {
        var assetBody = asset.custom.body.toString();
        viewData.promoMessage = assetBody;
    }
    
    res.setViewData(viewData);
    next();
});

module.exports = server.exports();