const express = require('express');
const jsonResult = require('../entities/jsonResult');
const authEntity = require('../entities/authEntity')
const auth = express.Router();

auth.post('/login', (req, res) => {
    res.json(authEntity.login(req, req.body.username, req.body.password));
})

auth.get('/logout', (req, res) => {
    res.json(authEntity.logout(req.session))
})

auth.get('/login_status', (req, res) => {
    res.json(authEntity.loginStatus(req.session))
})

auth.get('/getLoggedInUser', (req, res) => {
    utils.interceptLogin(req, () => {
        let user = _.find(fake_users.public, (o) => { return o.userId === req.session.userId; })
        res.json(jsonResult.success('OK', user));
    }, () => {
        res.json(jsonResult.authFail())
    })
})

module.exports = auth;