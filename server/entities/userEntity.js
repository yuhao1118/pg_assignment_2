'use strict';

const jsonResult = require('./jsonResult');
const _ = require('lodash');
const utils = require('../utils');

const userEntity = {
    getUserProfileById: function (userId) {
        const user = _.find(utils.getFakeUsers().public, o => o.userId === userId);
        if (user) {
            return jsonResult.success('user profile found', user);
        } else {
            return jsonResult.notFound('user not found');
        }
    },
    getRecommendUser: function () {
        const recommendUsers = _.slice(utils.getFakeUsers().public, 0, 5);
        return jsonResult.success('recommend users', recommendUsers);
    },
    updateUserProfile: function (profile, userId) {
        const userPublic = _.find(utils.getFakeUsers().public, n => n.userId === userId);
        const userPrivate = _.find(utils.getFakeUsers().private, n => n.userId === userId);

        if (userPublic && userPrivate) {
            if (profile.about) { userPublic.about = profile.about; }

            if (profile.old_pwd && profile.old_pwd === userPrivate.password) { userPrivate.password = profile.new_pwd; }

            const fakeUsersPublic = _.map(utils.getFakeUsers().public, n => n.userId === userId ? userPublic : n);
            const fakeUsersPrivate = _.map(utils.getFakeUsers().private, n => n.userId === userId ? userPrivate : n);
            const res = {
                public: fakeUsersPublic,
                private: fakeUsersPrivate
            };
            utils.updateFakeUsers(res);
            return jsonResult.success('User profile updated', userPublic);
        }
        return jsonResult.badRequest('User profile update failed');
    }
};

module.exports = userEntity;
