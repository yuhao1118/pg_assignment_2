const express = require('express');
const jsonResult = require('../entities/jsonResult');
const photoEntity = require('../entities/photoEntity');
const photo = express.Router();

photo.get('/all', (req, res) => {
    res.json(photoEntity.getAll());
})

photo.get('/all/:userId', (req, res) => {
    res.json(photoEntity.getPhotosById(req.params.userId));
})

photo.get('/downloads/:imgId', (req, res) => {
    res.json(photoEntity.downloadCount(req.params.imgId))
})

photo.post('/', (req, res) => {
        if (req.session.userId) {
            res.json(photoEntity.uploadImage(req.files, req.session.userId));
        } else {
            res.json(jsonResult.authFail("not login"));
        }
    })
    .delete('/:imgId', (req, res) => {
        if (req.session.userId) {
            res.json(photoEntity.deleteImage(req.params.imgId, req.session.userId));
        } else {
            res.json(jsonResult.authFail("not login"));
        }
    })

module.exports = photo;