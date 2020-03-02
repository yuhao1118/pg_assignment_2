const express = require('express');
const app = express();

app.use(express.static('client'))

app.get('/', (req, res) => {
    res.send('An alligator approaches!');
});

app.listen(3000, () => console.log("server listening on port 3000!"));