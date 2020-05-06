const express = require('express');
const app = express();
const ImageScraper = require('./services/ImageScraper')


app.get('/api/:url', (req, res) => {
    const url = req.params.url
    res.json(url)
})



const port = process.env.PORT || '5000';
app.listen(port, (err) => {
    if (err) {
      return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})