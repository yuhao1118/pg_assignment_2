const express = require('express');
const app = express();

app.use(express.static('client'));

app.get('/', (req, res) => {
  res.send('An alligator approaches!');
});

app.get('/images', (req, res) => {
  res.json([
    {
      id: 0,
      url:
        'https://cdn.pixabay.com/photo/2013/07/18/10/56/railroad-tracks-163518_1280.jpg',
      likes: 12,
      comments: []
    },
    {
      id: 1,
      url:
        'https://cdn.pixabay.com/photo/2018/03/30/15/11/deer-3275594_1280.jpg',
      likes: 15,
      comments: []
    },
    {
      id: 2,
      url:
        'https://cdn.pixabay.com/photo/2015/09/19/01/03/guitar-946701_1280.jpg',
      likes: 15,
      comments: []
    },
    {
      id: 3,
      url:
        'https://cdn.pixabay.com/photo/2016/08/17/01/39/mystery-1599527_1280.jpg',
      likes: 15,
      comments: []
    },
    {
      id: 4,
      url:
        'https://cdn.pixabay.com/photo/2016/07/02/12/21/eclipse-1492818_1280.jpg',
      likes: 15,
      comments: []
    },
    {
      id: 5,
      url:
        'https://cdn.pixabay.com/photo/2017/12/10/15/16/white-horse-3010129_1280.jpg',
      likes: 15,
      comments: []
    },
    {
      id: 6,
      url: 'https://cdn.pixabay.com/photo/2015/06/08/15/02/pug-801826_1280.jpg',
      likes: 15,
      comments: []
    },
    {
      id: 7,
      url:
        'https://cdn.pixabay.com/photo/2015/11/07/11/24/northern-lights-1031101_1280.jpg',
      likes: 15,
      comments: []
    },
    {
      id: 8,
      url:
        'https://cdn.pixabay.com/photo/2012/11/19/02/10/roses-66527_1280.jpg',
      likes: 15,
      comments: []
    }
  ]);
});
app.listen(3000, () => console.log('server listening on port 3000!'));
