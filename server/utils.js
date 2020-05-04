const uuid = require('uuid');
const fs = require('fs');
const path = require('path')

const utils = {
    genId: function () {
        return uuid.v1().replace(/-/g, '')
    },
    getFileType: function(filePath) {
        var startIndex = filePath.lastIndexOf(".");
        if(startIndex != -1)
            return filePath.substring(startIndex+1, filePath.length).toLowerCase();
        else return "";
    },
    sortByPublishes: function (a, b) {
        return b.publishes.length - a.publishes.length;
    },
    getFakeUsers: function() {
        return require('./fake_data/fake_users.json')
    },
    getFakePhotos: function() {
        return require('./fake_data/fake_photos.json')
    },
    updateFakeUsers: function(json) {
        fs.writeFile(path.join(__dirname, './fake_data/fake_users.json'), JSON.stringify(json), 'utf8', (err) => {
            if (err)
                console.log(err);
        });
    },
    updateFakePhotos: function(json) {
        fs.writeFile(path.join(__dirname, './fake_data/fake_photos.json'), JSON.stringify(json), 'utf8', (err) => {
            if (err)
                console.log(err);
        });
    }
}

module.exports = utils;