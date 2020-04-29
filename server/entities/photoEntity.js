const path = require('path');
const utils = require('../utils');
const _ = require('lodash');
const jsonResult = require('./jsonResult');
const fs = require('fs')

const photoEntity = {
    getAll : function() {
        return jsonResult.success("OK", utils.getFakePhotos());
    },
    uploadImage: function(files, userId) {
        if (!files || Object.keys(files).length === 0) {
            return jsonResult.notFound("No file were uploaded.");
        }
        let uploadFile = files.file;
        let imgId = utils.genId();
        let fakePhotos = utils.getFakePhotos();
        let uploadPath = path.join(__dirname, `../uploads/publishes/${imgId}`);

        uploadFile.mv(uploadPath, err => {
            if (err){
                console.log(err);
                return jsonResult.serverError(err)
            }

            fakePhotos.push({
                imgId,
                userId,
                date: new Date(),
                likes: 0,
                url: `/publishes/${imgId}`,
                downloads: 0
            });

            utils.updateFakePhotos(fakePhotos);
            return jsonResult.success("Upload success", fakePhotos);
        })
    },
    deleteImage: function(imgId, userId) {
        let fakePhotos = utils.getFakePhotos();
        let image = _.find(fakePhotos, n => (n.userId == userId && n.imgId == imgId))
        if (image) {
            let uploadPath = path.join(__dirname, `../uploads/publishes/${imgId}`)
            fs.unlink(uploadPath, err => {
                if (err) {
                    console.log(err);
                    return jsonResult.serverError(err)
                }
            })
        }
        _.remove(fakePhotos, n => (n.userId == userId && n.imgId == imgId));
        utils.updateFakePhotos(fakePhotos);
        return jsonResult.success("Delete success", fakePhotos);
    }
}

module.exports = photoEntity;