const express = require('express');
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

module.exports = auth;