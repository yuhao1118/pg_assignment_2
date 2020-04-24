const express = require('express');
const path = require('path');
const jsonResult = require('../entities/jsonResult');
const fake_photos = require('../fake_data/fake_photos');
const home = express.Router();

home.get('/explore', (req, res) => {
    res.json(jsonResult.success("OK",fake_photos))
})

home.get('/recommend', (req, res) => {
})

module.exports = home;