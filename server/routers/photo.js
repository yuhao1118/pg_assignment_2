'use strict';

const express = require('express');
const jsonResult = require('../entities/jsonResult');
const photoEntity = require('../entities/photoEntity');
const photo = express.Router();

/**
 * @api {get} /api/photo/all All Photos
 * @apiGroup Photo
 * @apiName AllPhotos
 * @apiDescription All uploaded photos array.
 *
 * @apiSuccess {Number} code Success response code
 * @apiSuccess {String} msg Success response message
 * @apiSuccess {Object[]} data Photo array
 * @apiSuccess {String} data.imgId Image Id
 * @apiSuccess {String} data.userId Publish user Id
 * @apiSuccess {String} data.filename Image filename
 * @apiSuccess {String} data.date Image submit date
 * @apiSuccess {String} data.url Image url
 * @apiSuccess {Number} data.download Image download count
 *
 * @apiError {Number} code Error Response code
 * @apiError {String} msg Error Response message
 */
photo.get('/all', (req, res) => {
    res.json(photoEntity.getAll());
});

/**
 * @api {get} /api/photo/all/:userId All Photos of a user
 * @apiGroup Photo
 * @apiName AllPhotosOfUser
 * @apiDescription Photo array all uploaded by the specified user.
 *
 * @apiParam {String} userId User unique ID.
 *
 * @apiSuccess {Number} code Success response code
 * @apiSuccess {String} msg Success response message
 * @apiSuccess {Object[]} data Photo array
 * @apiSuccess {String} data.imgId Image Id
 * @apiSuccess {String} data.userId Publish user Id
 * @apiSuccess {String} data.filename Image filename
 * @apiSuccess {String} data.date Image submit date
 * @apiSuccess {String} data.url Image url
 * @apiSuccess {Number} data.download Image download count
 *
 * @apiError {Number} code Error Response code
 * @apiError {String} msg Error Response message
 */
photo.get('/all/:userId', (req, res) => {
    res.json(photoEntity.getPhotosById(req.params.userId));
});

/**
 * @api {get} /api/photo/downloads/:imgId Download Count By Id
 * @apiGroup Photo
 * @apiName DownloadCountByImageId
 * @apiDescription The download count of the specified image.
 *
 * @apiParam {String} imgId Image unique ID.
 *
 * @apiSuccess {Number} code Success response code
 * @apiSuccess {String} msg Success response message
 * @apiSuccess {Object} data Count Incremented Photo
 * @apiSuccess {String} data.imgId Image Id
 * @apiSuccess {String} data.userId Publish user Id
 * @apiSuccess {String} data.filename Image filename
 * @apiSuccess {String} data.date Image submit date
 * @apiSuccess {String} data.url Image url
 * @apiSuccess {Number} data.download New image download count
 *
 * @apiError {Number} code Error Response code
 * @apiError {String} msg Error Response message
 */
photo.get('/downloads/:imgId', (req, res) => {
    res.json(photoEntity.downloadCount(req.params.imgId));
});

photo
    /**
     * @api {post} /api/photo/ Upload Image
     * @apiGroup Photo
     * @apiName UploadImage
     * @apiDescription Upload an image.
     *
     * @apiParam {Object} img Uploaded image.
     *
     * @apiPermission login
     *
     * @apiSuccess {Number} code Success response code
     * @apiSuccess {String} msg Success response message
     * @apiSuccess {Object[]} data New photo array
     * @apiSuccess {String} data.imgId Image Id
     * @apiSuccess {String} data.userId Publish user Id
     * @apiSuccess {String} data.filename Image filename
     * @apiSuccess {String} data.date Image submit date
     * @apiSuccess {String} data.url Image url
     * @apiSuccess {Number} data.download Image download count
     *
     * @apiError {Number} code Error Response code
     * @apiError {String} msg Error Response message
     */
    .post('/', (req, res) => {
        if (req.session.userId) {
            res.json(photoEntity.uploadImage(req.files, req.session.userId));
        } else {
            res.json(jsonResult.authFail('Not login!'));
        }
    })
    /**
     * @api {delete} /api/photo/:imgId Delete Image By Id
     * @apiGroup Photo
     * @apiName DeleteImage
     * @apiDescription Delete an image by image id.
     *
     * @apiParam {String} imgId Image unique ID.
     *
     * @apiPermission login
     *
     * @apiSuccess {Number} code Success response code
     * @apiSuccess {String} msg Success response message
     * @apiSuccess {Object[]} data New photo array
     * @apiSuccess {String} data.imgId Image Id
     * @apiSuccess {String} data.userId Publish user Id
     * @apiSuccess {String} data.filename Image filename
     * @apiSuccess {String} data.date Image submit date
     * @apiSuccess {String} data.url Image url
     * @apiSuccess {Number} data.download Image download count
     *
     * @apiError {Number} code Error Response code
     * @apiError {String} msg Error Response message
     */
    .delete('/:imgId', (req, res) => {
        if (req.session.userId) {
            res.json(photoEntity.deleteImage(req.params.imgId, req.session.userId));
        } else {
            res.json(jsonResult.authFail('Not login!'));
        }
    });

module.exports = photo;
