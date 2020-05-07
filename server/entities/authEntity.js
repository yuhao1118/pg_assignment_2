'use strict';

const utils = require('../utils');
const jsonResult = require('./jsonResult');
const _ = require('lodash');

const authEntity = {
    login: function (req, username, password) {
        const user = _.find(utils.getFakeUsers().private, o => (o.username === username && o.password === password));
        if (user) {
            req.session.userId = user.userId;
            return jsonResult.success('Login success!', user);
        } else {
            return jsonResult.authFail('Username or password incorrect.');
        }
    },
    logout: function (session) {
        if (session.userId) {
            session.destroy();
            return jsonResult.success('Logout success!', null);
        } else {
            return jsonResult.authFail('Not login.');
        }
    },
    loginStatus: function (session) {
        const loginState = {
            loggedIn: Boolean(session.userId),
            loggedInUser: session.userId || null
        };
        return jsonResult.success('Login status.', loginState);
    }
};

module.exports = authEntity;
