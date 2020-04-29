const express = require('express');
const _ = require('lodash');
const jsonResult = require('../entities/jsonResult');
const utils = require('../utils')
const user = express.Router();

user.get('/public/:userId', (req, res) => {
    let user = _.find(utils.getFakeUsers().public, (o) => { return o.userId === req.params.userId; })
    if (user) {
        res.json(jsonResult.success('OK', user));
    } else {
        res.json(jsonResult.notFound('user not found'))
    }
})

user.get('/recommend', (req, res) => {
    res.json(jsonResult.success("OK", utils.getFakeUsers().public))
})

module.exports = user;