const express = require('express');
const app = express();
const path = require('path')
const bodyParser = require('body-parser');
const session = require('express-session');

// Routers
const main = require('./routers/main')
const home = require('./routers/home')
const user = require('./routers/user')
const auth = require('./routers/auth')

// Midwares
app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: false
}))
app.use('/', main);
app.use('/api/home', home);
app.use('/api/user', user);
app.use('/api/auth', auth);

app.listen(3000, () => {
    console.log('Server listening on port 3000!');
});
