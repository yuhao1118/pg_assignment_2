const express = require('express');
const app = express();
const path = require('path')

app.use(express.static('client'));

/* HTML responses */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../client/home.html"))
});

app.get('/user', (req, res) => {
    res.sendFile(path.join(__dirname, "../client/user.html"))
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "../client/login.html"))
})

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, "../client/signup.html"))
})

/* Json responses */
app.get('/status', (req, res) => {
    res.send('Server listening on port 3000!');
  });

app.get('/user/:id', (req, res) => {
  res.json({
    id: req.params.id,
    name: 'Yuhao Li',
    avatar: 'dist/img/avatar.jpg',
    followers: ['bxzr32', 'bxzr32', 'bxzr32'],
    following: ['bxzr32', 'bxzr32']
  });
});

app.get('/images/', (req, res) => {
  res.json([
    {
      id: 'img_0',
      usr_id: 'yuhao1118',
      url: 'dist/img/img_0.jpg',
      likes: 12,
      downloads: 9,
      comment: 'Railway'
    },
    {
      id: 'img_1',
      usr_id: 'lucgeo',
      url: 'dist/img/img_1.jpg',
      likes: 15,
      downloads: 9,
      comment: 'Deer'
    },
    {
      id: 'img_2',
      usr_id: 'yuhao1118',
      url: 'dist/img/img_2.jpg',
      likes: 15,
      downloads: 9,
      comment: 'Girl with guitar'
    },
    {
      id: 'img_3',
      usr_id: 'yuhao1118',
      url: 'dist/img/img_3.jpg',
      likes: 15,
      downloads: 9,
      comment: 'A small island'
    },
    {
      id: 'img_4',
      usr_id: 'yuhao1118',
      url: 'dist/img/img_4.jpg',
      likes: 15,
      downloads: 9,
      comment: 'Blackhole'
    },
    {
      id: 'img_5',
      usr_id: 'yuhao1118',
      url: 'dist/img/img_5.jpg',
      likes: 15,
      downloads: 9,
      comment: 'Yellow rose'
    },
    {
      id: 'img_6',
      usr_id: 'yuhao1118',
      url: 'dist/img/img_6.jpg',
      likes: 15,
      downloads: 9,
      comment: 'Horse'
    },
    {
      id: 'img_7',
      usr_id: 'yuhao1118',
      url: 'dist/img/img_7.jpg',
      likes: 15,
      downloads: 9,
      comment: 'Dog'
    },
    {
      id: 'img_8',
      usr_id: 'yuhao1118',
      url: 'dist/img/img_8.jpg',
      likes: 15,
      downloads: 9,
      comment: 'Aurora'
    }
  ]);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000!');
});
