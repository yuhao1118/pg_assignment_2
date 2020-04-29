const express = require('express');
const app = express();
const path = require('path')
const bodyParser = require('body-parser');
const session = require('express-session');
const fileUpload = require('express-fileupload');

// Routers
const main = require('./routers/main')
const photo = require('./routers/photo')
const user = require('./routers/user')
const auth = require('./routers/auth')

// Midwares
app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, './uploads')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: false
}))
app.use(fileUpload());
app.use('/', main);
app.use('/api/photo', photo);
app.use('/api/user', user);
app.use('/api/auth', auth);

app.listen(3000, () => {
    console.log('Server listening on port 3000!');
});
