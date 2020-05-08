const express = require('express')
const app = express()
const fs = require('fs')
const archiver = require('archiver')

const ImageScraper = require('./services/ImageScraper')

let images = [
    'https://www.mac-photography.com/wp-content/uploads/2018/10/maternity.jpg',
    'https://www.mac-photography.com/wp-content/uploads/2019/03/IMG_3228.jpg',
    'https://www.mac-photography.com/wp-content/uploads/2018/10/pregnancy_pics.jpg',
]

app.get('/api/download/', async (req, res) => {
    let output = fs.createWriteStream(__dirname + '/example.zip')
    ImageScraper.downloadImages(output, images)
    output.on('close', function () {
        res.download(__dirname + '/example.zip')
    })
})

app.get('/api/:url', async (req, res) => {
    req.setTimeout(0)
    const url = req.params.url
    console.log(url)
    const links = await ImageScraper.getAllImages(url)
    res.json(links)
})

const port = process.env.PORT || '5000'
app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})
