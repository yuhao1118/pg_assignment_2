'use strict';

const base_url = config.base_url;

// init navbar
loadNavbarAvatar();

// load recommend users
fetch(base_url + '/api/user/recommend')
    .then((res) => res.json())
    .then((res) => res.data)
    .then((res) => {
        for (let usr of res) {
            const rec_user = $('#recommend-user-template').clone();
            $(rec_user).attr('id', usr.userId).removeClass('d-none');
            $(rec_user).attr('href', `/user?userId=${usr.userId}`);
            $(rec_user).find('img').attr('src', usr.avatar);
            $(rec_user).find('p').append(usr.username);
            $('#recommend-user-row').append(rec_user);
        }
    });

// load images
fetch(base_url + '/api/photo/all')
    .then((res) => res.json())
    .then((res) => res.data)
    .then((res) => {
        const promises = [];
        for (let item of res) {
            promises.push(
                Promise.resolve(item).then((item) =>
                    fetch(base_url + `/api/user/public/${item.userId}`)
                        .then(usr => usr.json())
                        .then(usr => usr.data)
                        .then(usr => {
                            const grid_item = $('#grid-item-template').clone();
                            $(grid_item).attr('id', item.imgId).removeClass('d-none');
                            $(grid_item).find('#avatar-group').attr('href', `/user?userId=${usr.userId}`);
                            $(grid_item).find('#avatar-group small').append(usr.userId);
                            $(grid_item).find('#avatar-group img').attr('src', usr.avatar);
                            $(grid_item).find('#avatar-group .avatar-title').append(usr.username);
                            $(grid_item).find('#avatar-group .avatar-date').append($.timeago(item.date));
                            $(grid_item).find('#grid-img').attr('src', item.url);
                            $(grid_item).find('#image-modal-toggle').attr('data-target', '#img' + item.imgId);
                            $(grid_item).find('#image-modal').attr('id', 'img' + item.imgId);
                            $(grid_item).find('#download p').append(item.downloads + ' downloads');
                            $(grid_item).find('#download').attr('href', item.url).on('click', () => {
                                // increment download count
                                fetch(base_url + `/api/photo/downloads/${item.imgId}`)
                                    .then(res => res.json())
                                    .then(res => {
                                        $(grid_item).find('#download p').empty().append(res.data.downloads + ' downloads');
                                    });
                            });
                            $(grid_item).find('#download').attr('download', item.filename);
                            $('.grid').append(grid_item);
                        })
                )
            );
        }
        return Promise.all(promises);
    })
    .then(() => {
        var $grid = $('.grid').imagesLoaded(() => {
            $grid.masonry({
                itemSelector: '.grid-item',
                percentPosition: true,
                columnWidth: '.grid-sizer',
                gutter: '.gutter-sizer'
            });
        });
    });

// init upload zone
Dropzone.options.uploadForm = {
    autoProcessQueue: false,
    addRemoveLinks: false,
    init: function (e) {
        var myDropzone = this;
        $('#upload-button').on('click', () => {
            fetch(base_url + '/api/auth/login_status')
                .then(res => res.json())
                .then(res => res.data)
                .then(res => {
                    if (res.loggedIn) {
                        myDropzone.processQueue();
                    } else {
                        // toast login
                        $('#fail-login-alert span').empty();
                        $('#fail-login-alert').removeClass('d-none');
                        $('#fail-login-alert span').append("You're not login. Redirecting to login page...");
                        // redirect to login
                        setTimeout(() => {
                            $('#fail-login-alert').addClass('d-none');
                            $(location).attr('href', base_url + '/login');
                        }, 3000);
                    }
                });
        });
        myDropzone.on('complete', function (file) {
            if (
                this.getUploadingFiles().length === 0 &&
                this.getQueuedFiles().length === 0
            ) {
                setTimeout(() => {
                    location.reload();
                }, 1500);
            }
        });
    }
};
