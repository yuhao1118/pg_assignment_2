const jsonResult = require('./jsonResult')
const _ = require('lodash')
const utils = require('../utils')

const userEntity = {
    getUserProfileById: function (userId) {
        let user = _.find(utils.getFakeUsers().public, o => o.userId === userId)
        if (user) {
            return jsonResult.success('user profile found', user)
        } else {
            return jsonResult.notFound('user not found')
        }
    },
    getRecommendUser: function () {
        let recommendUsers = _.slice(utils.getFakeUsers().public, 0, 5);
        return jsonResult.success('recommend users', recommendUsers);
    },
    updateUserProfile: function (profile, userId) {
        let userPublic = _.find(utils.getFakeUsers().public, n => n.userId === userId)
        let userPrivate = _.find(utils.getFakeUsers().private, n => n.userId === userId)
        
        if (userPublic && userPrivate) {
            if (profile.about)
                userPublic.about = profile.about;

            if (profile.old_pwd && profile.old_pwd === userPrivate.password)
                userPrivate.password = profile.new_pwd;

            let fakeUsersPublic = _.map(utils.getFakeUsers().public, n => n.userId === userId ? userPublic : n);
            let fakeUsersPrivate = _.map(utils.getFakeUsers().private, n => n.userId === userId ? userPrivate : n);
            let res = {
                public: fakeUsersPublic,
                private: fakeUsersPrivate
            }
            utils.updateFakeUsers(res)
            return jsonResult.success("User profile updated", userPublic)
        }
        return jsonResult.badRequest("User profile update failed");
    }
}

module.exports = userEntity;