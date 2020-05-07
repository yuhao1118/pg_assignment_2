'use strict';

const base_url = config.base_url;
const urlParams = decodeUrlParams();
const loadImages = (api) => fetch(base_url + api)
    .then(usr => usr.json())
    .then(usr => {
        if (usr.code === 200) {
            usr = usr.data;
            // load profile
            $('#profile h4 a').append(usr.username);
            $('#profile footer').append(usr.userId);
            $('#profile p').append(usr.about);
            $('#profile img').attr('src', usr.avatar);

            // load images
            fetch(base_url + `/api/photo/all/${usr.userId}`)
                .then((res) => res.json())
                .then((res) => res.data)
                .then((res) => {
                    const promises = [];
                    for (let item of res) {
                        promises.push(
                            Promise.resolve(item).then(item => {
                                const grid_item = $('#grid-item-template').clone();
                                $(grid_item).attr('id', item.imgId).removeClass('d-none');
                                $(grid_item).find('#avatar-group').attr('href', '/user');
                                $(grid_item).find('#avatar-group small').append(usr.userId);
                                $(grid_item).find('#avatar-group img').attr('src', usr.avatar);
                                $(grid_item).find('#avatar-group .avatar-title').append(usr.username);
                                $(grid_item).find('#avatar-group .avatar-date').append($.timeago(item.date));
                                $(grid_item).find('#grid-img').attr('src', item.url);
                                $(grid_item).find('#image-modal-toggle').attr('data-target', '#img' + item.imgId);
                                $(grid_item).find('#image-modal').attr('id', 'img' + item.imgId);
                                $(grid_item).find('#delete').attr('data-target', '#delete' + item.imgId);
                                $(grid_item).find('#delete-modal').attr('id', 'delete' + item.imgId);
                                $(grid_item).find('#download p').append(item.downloads + ' downloads');
                                $(grid_item).find('#download').attr('href', item.url).on('click', () => {
                                    // increment download count
                                    fetch(base_url + `/api/photo/downloads/${item.imgId}`)
                                        .then(res => res.json())
                                        .then(res => {
                                            console.log(res);
                                            $(grid_item).find('#download p').empty().append(res.data.downloads + ' downloads');
                                        });
                                });
                                $(grid_item).find('#download').attr('download', item.filename);
                                $(grid_item).find('#confirm-delete').on('click', () => {
                                    // delete image second confirm click event
                                    fetch(base_url + `/api/photo/${item.imgId}`, { method: 'DELETE' }).then(res => res.json())
                                        .then(res => {
                                            console.log(res);
                                            if (res.code === 200 && res.msg === 'Delete success!') {
                                                $(grid_item).find('#success-delete-alert span').empty();
                                                $(grid_item).find('#success-delete-alert').removeClass('d-none');
                                                $(grid_item).find('#success-delete-alert span').append(res.msg);
                                                setTimeout(() => {
                                                    $(grid_item).find('#success-delete-alert').addClass('d-none');
                                                    location.reload();
                                                }, 3000);
                                            } else {
                                                $(grid_item).find('#fail-delete-alert span').empty();
                                                $(grid_item).find('#fail-delete-alert').removeClass('d-none');
                                                $(grid_item).find('#fail-delete-alert span').append(res.msg);
                                                setTimeout(() => {
                                                    $(grid_item).find('#fail-delete-alert').addClass('d-none');
                                                    location.reload();
                                                }, 3000);
                                            }
                                        });
                                });
                                $('.grid').append(grid_item);
                            })
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
        }
    });

// init navbar
loadNavbarAvatar();

// check where it is redirect from
fetch(base_url + '/api/auth/login_status')
    .then(res => res.json())
    .then(res => res.data)
    .then(res => {
        if (res.loggedIn && !urlParams.userId) {
            loadImages('/api/user/my');
            $('#edit-profile').removeClass('d-none');
            $('#update-profile-button').on('click', () => {
                // post updated user profile click
                fetch(base_url + '/api/user/my', {
                    method: 'post',
                    headers: { 'content-type': 'application/x-www-form-urlencoded' },
                    body: $('#profile-form').serialize()
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res.code === 200 && res.msg === 'User profile updated') { 
                            $('#profile-modal').modal('toggle'); 
                            $('#profile p').empty().append(res.data.about);
                    } else {
                            $('#fail-update-alert span').empty();
                            $('#fail-update-alert').removeClass('d-none');
                            $('#fail-update-alert span').append(res.msg);
                            setTimeout(() => {
                                $('#fail-update-alert').addClass('d-none');
                            }, 3000);
                        }
                    });
            });
        } else if (urlParams.userId) {
            if (res.loggedIn && urlParams.userId === res.loggedInUser) {
                $(location).attr('href', base_url + '/user');
            } else {
                loadImages(`/api/user/public/${urlParams.userId}`);
                $('[id=delete]').addClass('d-none');
                $('[id=download]').addClass('ml-auto').removeClass('ml-2');
            }
        } else {
            $(location).attr('href', base_url + '/login');
        }
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
