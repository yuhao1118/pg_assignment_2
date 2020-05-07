'use strict';

const base_url = config.base_url;

// init navbar
loadNavbarAvatar();

// submit login form
$('#login-button').on('click', () => {
    fetch(base_url + '/api/auth/login', {
        method: 'post',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: $('#login-form').serialize()
    })
        .then(res => res.json())
        .then(res => {
            if (res.code === 200 && res.msg === 'Login success!') { $(location).attr('href', base_url); } else {
                $('#fail-login-alert span').empty();
                $('#fail-login-alert').removeClass('d-none');
                $('#fail-login-alert span').append(res.msg);
                setTimeout(() => {
                    $('#fail-login-alert').addClass('d-none');
                }, 3000);
            }
        });
});
