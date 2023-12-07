var CustomObjectMgr = require("dw/object/CustomObjectMgr");

function getCustomObject(customObjectType, primaryKey) {
    return CustomObjectMgr.getCustomObject(customObjectType, primaryKey);
}

function createCustomObject(customObjectType, primaryKey) {
    return CustomObjectMgr.createCustomObject(customObjectType, primaryKey);
}

module.exports = {
    getCustomObject: getCustomObject,
    createCustomObject: createCustomObject
};
