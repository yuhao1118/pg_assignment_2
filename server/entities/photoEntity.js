'use strict';

const path = require('path');
const utils = require('../utils');
const _ = require('lodash');
const jsonResult = require('./jsonResult');
const fs = require('fs');

const photoEntity = {
    getAll: function () {
        return jsonResult.success('Images found.', utils.getFakePhotos());
    },
    getPhotosById: function (userId) {
        const fakePhotos = utils.getFakePhotos();
        const images = _.filter(fakePhotos, n => n.userId === userId);
        return jsonResult.success('Images found.', images);
    },
    uploadImage: function (files, userId) {
        if (!files || Object.keys(files).length === 0) {
            return jsonResult.notFound('No file were uploaded.');
        }

        const uploadFile = files.file;

        if (uploadFile) {
            const fileType = utils.getFileType(files.file.name);
            const imgId = utils.genId();
            const filename = `${imgId}.${fileType}`;
            const fakePhotos = utils.getFakePhotos();
            const uploadPath = path.join(__dirname, `../uploads/publishes/${filename}`);

            uploadFile.mv(uploadPath, err => {
                if (err) {
                    console.log(err);
                    return jsonResult.serverError(err);
                }
                fakePhotos.push({
                    imgId,
                    userId,
                    filename,
                    date: new Date(),
                    url: `/publishes/${filename}`,
                    downloads: 0
                });

                utils.updateFakePhotos(fakePhotos);
                return jsonResult.success('Upload success!', fakePhotos);
            });
        } else {
            return jsonResult.notFound('No file were uploaded.');
        }
    },
    deleteImage: function (imgId, userId) {
        const fakePhotos = utils.getFakePhotos();
        const image = _.find(fakePhotos, n => (n.userId === userId && n.imgId === imgId));
        if (image) {
            const uploadPath = path.join(__dirname, `../uploads/publishes/${image.filename}`);
            fs.unlink(uploadPath, err => {
                if (err) {
                    console.log(err);
                    return jsonResult.serverError(err);
                }
            });
            _.remove(fakePhotos, n => (n.userId === userId && n.imgId === imgId));

            utils.updateFakePhotos(fakePhotos);
            return jsonResult.success('Delete success!', fakePhotos);
        } else {
            return jsonResult.serverError('Image not found!');
        }
    },
    downloadCount: function (imgId) {
        let fakePhotos = utils.getFakePhotos();
        const image = _.find(fakePhotos, n => n.imgId === imgId);
        if (image) {
            image.downloads++;
            fakePhotos = _.map(fakePhotos, n => {
                return n.imgId === imgId ? image : n;
            });
            utils.updateFakePhotos(fakePhotos);
            return jsonResult.success('Download count incremented.', image);
        } else {
            return jsonResult.serverError('Image not found');
        }
    }
};

module.exports = photoEntity;
