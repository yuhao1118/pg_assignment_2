'use strict';

const app = require('./app');
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log(new Date().toTimeString() + ': A client connected');
    socket.on('disconnect', () => {
        console.log(new Date().toTimeString() + ': A client disconnected');
    });
});

http.listen(3000, () => {
    console.log(new Date().toTimeString() + ': Server listening on port 3000!');
});
