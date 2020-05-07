/* eslint-disable */

const request = require('supertest');
const app = require('./app');

function serialise (obj) {
    return Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');
}

describe('Test the people service', () => {
    test('GET /api/photo/all return photo array in JSON', () => {
        return request(app)
            .get('/api/photo/all')
            .expect(200)
            .then(res => res.body)
            .then(res => {
                expect(res.msg).toBe('Images found.');
            });
    });

    test('DELETE /api/photo/123456 return image not found', () => {
        return request(app)
            .delete('/api/photo/123456')
            .expect(200)
            .then(res => res.body)
            .then(res => {
                expect(res.msg).toBe('Not login!');
            });
    });

    test('GET /api/user/public/demo_user_1 return user profile in JSON', () => {
        return request(app)
            .get('/api/user/public/demo_user_1')
            .expect(200)
            .then(res => res.body)
            .then(res => {
                expect(res.data.userId).toBe('demo_user_1');
            });
    });

    test('GET /api/user/my return not login msg', () => {
        return request(app)
            .get('/api/user/my')
            .expect(200)
            .then(res => res.body)
            .then(res => {
                expect(res.msg).toBe('Not login!');
            });
    });

    test('GET /api/auth/login_status return login_status in JSON', () => {
        return request(app)
            .get('/api/auth/login_status')
            .expect(200)
            .then(res => res.body)
            .then(res => {
                expect(res.data.loggedIn).toBe(false);
            });
    });

    test('POST /api/auth/login return logged in user profile in JSON', () => {
        const params_body = {
            username: 'DemoUser1',
            password: '123456'
        };

        return request(app)
            .post('/api/auth/login')
            .send(serialise(params_body))
            .expect(200)
            .then(res => res.body)
            .then(res => {
                expect(res.data.username).toBe('DemoUser1');
            });
    });

    test('POST /api/auth/login return login fail', () => {
        const params_body = {
            username: 'DemoUser1',
            password: '1234567'
        };

        return request(app)
            .post('/api/auth/login')
            .send(serialise(params_body))
            .expect(200)
            .then(res => res.body)
            .then(res => {
                expect(res.msg).toBe('Username or password incorrect.');
            });
    });
});
