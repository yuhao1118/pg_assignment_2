const express = require('express');
const path = require('path')
const _ = require('lodash');
const fake_users = require('../fake_data/fake_users');
const jsonResult = require('../entities/jsonResult');
const user = express.Router();

user.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/user.html'))
})

user.get('/public/:userId', (req, res) => {
    let user = _.find(fake_users.public, (o) => { return o.userId === req.params.userId; })
    if (user) {
        res.json(jsonResult.success('OK', user));
    } else {
        res.json('fail')
    }
})
module.exports = user;