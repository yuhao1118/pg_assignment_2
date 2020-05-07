'use strict';

// functions
const loadNavbarAvatar = () => {
    $('#navigation').load('navbar.html', () => {
        $('#logout').on('click', () => {
            fetch(config.base_url + '/api/auth/logout')
                .then(res => res.json())
                .then(res => {
                    if (res.code === 200 && res.msg === 'Logout success!') { loadNavbarAvatar(); }
                });
        });
        fetch(base_url + '/api/auth/login_status')
            .then(res => res.json())
            .then(res => res.data)
            .then(res => {
                if (res.loggedIn) {
                    fetch(base_url + '/api/user/my')
                        .then(my => my.json())
                        .then(my => {
                            if (my.code === 200) {
                                $('nav #nav-login-group').addClass('d-none');
                                $('nav #nav-avatar-dropdown').removeClass('d-none');
                                $('#nav-avatar').attr('src', my.data.avatar);
                                $('nav #profile').attr('href', '/user');
                            }
                        });
                } else {
                    $('nav #nav-avatar-dropdown').addClass('d-none');
                    $('nav #nav-login-group').removeClass('d-none');
                }
            });
    });
};

// decode url parameters
const decodeUrlParams = () => {
    const url = location.search;
    const obj = {};

    if (url.indexOf('?') != -1) {
        let str = url.substr(1);
        let strs = str.split('&');
        for (let i = 0; i < strs.length; i++) {
            obj[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
        }
    }

    return obj;
};


// handle server disconnection
const socket = io();
socket.on('disconnect', () => {
    alert("Server connection lost! Please try again.")
})