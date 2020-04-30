const jsonResult = require('./jsonResult')
const _ = require('lodash')
const utils = require('../utils')

const userEntity = {
    getUserProfileById : function(userId) {
        let user = _.find(utils.getFakeUsers().public, o => o.userId === userId)
        if (user) {
            return jsonResult.success('user profile found', user)
        } else {
            return jsonResult.notFound('user not found')
        }
    },
    getRecommendUser : function() {
        let recommendUsers = _.slice(utils.getFakeUsers().public, 0, 5);
        return jsonResult.success('recommend users', recommendUsers);
    }
}

module.exports = userEntity;