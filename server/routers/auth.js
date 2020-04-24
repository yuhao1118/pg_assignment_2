const express = require('express');
const path = require('path')
const _ = require('lodash');
const fake_users = require('../fake_data/fake_users');
const jsonResult = require('../entities/jsonResult');
const auth = express.Router();

auth.post('/login', (req, res) => {
    let user = _.find(fake_users.private, (o) => { return o.username === req.body.username; })
    if (user && req.body.password === user.password){
        req.session.username = req.body.username;
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
        Loggedin : Boolean(req.session.username)
    }
    res.json(jsonResult.success("OK", loginStatus))
})

module.exports = auth;