'use strict';

const express = require('express');
const path = require('path');
const main = express.Router();

main.get('/', (req, res) => {
    res.redirect('/home');
});

main.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/home.html'));
});

main.get('/user', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/user.html'));
});

main.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/login.html'));
});

main.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/signup.html'));
});

module.exports = main;
