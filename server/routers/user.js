const express = require('express');
const userEntity = require('../entities/userEntity');
const jsonResult = require('../entities/jsonResult')
const user = express.Router();

user.get('/public/:userId', (req, res) => {
    res.json(userEntity.getUserProfileById(req.params.userId))
})

user.route('/my')
    .get((req, res) => {
        if (req.session.userId) {
            res.json(userEntity.getUserProfileById(req.session.userId))
        } else {
            res.json(jsonResult.authFail("Not login!"))
        }
    })
    .post((req, res) => {
        if (req.session.userId) {
            res.json(userEntity.updateUserProfile(req.body, req.session.userId))
        } else {
            res.json(jsonResult.authFail("Not login!"))
        }
    })

user.get('/recommend', (req, res) => {
    res.json(userEntity.getRecommendUser())
})

module.exports = user;