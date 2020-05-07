'use strict';

const express = require('express');
const authEntity = require('../entities/authEntity');
const auth = express.Router();

/**
 * @api {post} /api/auth/login Login
 * @apiGroup Auth
 * @apiName Login
 * @apiDescription Request login.
 *
 * @apiParam {String} username Username.
 * @apiParam {String} password Password.
 *
 * @apiSuccess {Number} code Success response code
 * @apiSuccess {String} msg Success response message
 * @apiSuccess {Object} data Logged in user profile
 * @apiSuccess {String} data.username Username
 * @apiSuccess {String} data.userId User Id
 * @apiSuccess {String} data.avatar User avatar url
 * @apiSuccess {String} data.about User about information
 *
 * @apiError {Number} code Error Response code
 * @apiError {String} msg Error Response message
 */
auth.post('/login', (req, res) => {
    res.json(authEntity.login(req, req.body.username, req.body.password));
});

/**
 * @api {get} /api/auth/logout Logout
 * @apiGroup Auth
 * @apiName Logout
 * @apiDescription Request logout.
 *
 * @apiSuccess {Number} code Success response code
 * @apiSuccess {String} msg Success response message
 *
 * @apiError {Number} code Error Response code
 * @apiError {String} msg Error Response message
 */
auth.get('/logout', (req, res) => {
    res.json(authEntity.logout(req.session));
});

/**
 * @api {get} /api/auth/login_status Login Status
 * @apiGroup Auth
 * @apiName loginStatus
 * @apiDescription Check if user is logged in.
 *
 * @apiSuccess {Number} code Success response code
 * @apiSuccess {String} msg Success response message
 * @apiSuccess {Object} data Login state
 * @apiSuccess {Boolean} data.loggedIn Is user logged in
 * @apiSuccess {String} data.loggedInUser logged in user Id or null
 *
 * @apiError {Number} code Error Response code
 * @apiError {String} msg Error Response message
 */
auth.get('/login_status', (req, res) => {
    res.json(authEntity.loginStatus(req.session));
});

module.exports = auth;
