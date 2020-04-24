const uuid = require('uuid');

const utils = {
    genId : function() {
        return uuid.v1().replace(/-/g,'')
    }
}

module.exports = utils;