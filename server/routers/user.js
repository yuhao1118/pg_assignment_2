'use strict';

const express = require('express');
const userEntity = require('../entities/userEntity');
const jsonResult = require('../entities/jsonResult');
const user = express.Router();

/**
 * @api {get} /api/user/public/:userId User By Id
 * @apiGroup User
 * @apiName UserById
 * @apiDescription The specified user profile.
 *
 * @apiParam {String} userId User unique ID.
 *
 * @apiSuccess {Number} code Success response code
 * @apiSuccess {String} msg Success response message
 * @apiSuccess {Object} data User profile
 * @apiSuccess {String} data.username Username
 * @apiSuccess {String} data.userId User Id
 * @apiSuccess {String} data.avatar User avatar url
 * @apiSuccess {String} data.about User about information
 *
 * @apiError {Number} code Error Response code
 * @apiError {String} msg Error Response message
 */
user.get('/public/:userId', (req, res) => {
    res.json(userEntity.getUserProfileById(req.params.userId));
});

user.route('/my')
    /**
     * @api {get} /api/user/my Current User
     * @apiGroup User
     * @apiName CurrentUser
     * @apiDescription The current logged in user profile.
     *
     * @apiPermission login
     *
     * @apiSuccess {Number} code Success response code
     * @apiSuccess {String} msg Success response message
     * @apiSuccess {Object} data User profile
     * @apiSuccess {String} data.username Username
     * @apiSuccess {String} data.userId User Id
     * @apiSuccess {String} data.avatar User avatar url
     * @apiSuccess {String} data.about User about information
     *
     * @apiError {Number} code Error Response code
     * @apiError {String} msg Error Response message
     */
    .get((req, res) => {
        if (req.session.userId) {
            res.json(userEntity.getUserProfileById(req.session.userId));
        } else {
            res.json(jsonResult.authFail('Not login!'));
        }
    })

    /**
     * @api {post} /api/user/my Update User Profile
     * @apiGroup User
     * @apiName UpdateUserProfile
     * @apiDescription Post an update profile of the current user.
     *
     * @apiParam {Object} profile Update user profile.
     * @apiParam {String} profile.old_pwd Old password.
     * @apiParam {String} profile.new_pwd New password.
     * @apiParam {String} profile.about New user about information.
     *
     * @apiPermission login
     *
     * @apiSuccess {Number} code Success response code
     * @apiSuccess {String} msg Success response message
     * @apiSuccess {Object} data New user profile
     * @apiSuccess {String} data.username Username
     * @apiSuccess {String} data.userId User Id
     * @apiSuccess {String} data.avatar User avatar url
     * @apiSuccess {String} data.about New user about information
     *
     * @apiError {Number} code Error Response code
     * @apiError {String} msg Error Response message
     */
    .post((req, res) => {
        if (req.session.userId) {
            res.json(userEntity.updateUserProfile(req.body, req.session.userId));
        } else {
            res.json(jsonResult.authFail('Not login!'));
        }
    });

/**
 * @api {get} /api/user/recommend Recommend Users
 * @apiGroup User
 * @apiName RecommendUsers
 * @apiDescription The recommend user profiles.
 *
 * @apiSuccess {Number} code Success response code
 * @apiSuccess {String} msg Success response message
 * @apiSuccess {Object[]} data User profile
 * @apiSuccess {String} data.username Username
 * @apiSuccess {String} data.userId User Id
 * @apiSuccess {String} data.avatar User avatar url
 * @apiSuccess {String} data.about User about information
 *
 * @apiError {Number} code Error Response code
 * @apiError {String} msg Error Response message
 */
user.get('/recommend', (req, res) => {
    res.json(userEntity.getRecommendUser());
});

module.exports = user;
