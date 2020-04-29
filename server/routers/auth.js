const express = require('express');
const _ = require('lodash');
const fake_users = require('../fake_data/fake_users.json');
const jsonResult = require('../entities/jsonResult');
const utils = require('../utils');
const auth = express.Router();

auth.post('/login', (req, res) => {
    let user = _.find(fake_users.private, (o) => { return o.username === req.body.username; })
    if (user && req.body.password === user.password) {
        req.session.userId = user.userId;
        res.redirect('/home');
    }
    else {
        res.redirect('/login');
    }
})

auth.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy()
    }
    res.redirect('/')
})

auth.get('/login_status', (req, res) => {
    let loginStatus = {
        loggedIn: Boolean(req.session.userId)
    }
    res.json(jsonResult.success("OK", loginStatus))
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