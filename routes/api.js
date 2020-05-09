const express = require('express')
const router = express.Router()
const axios = require('axios')
const client = require('../redis')
const cache = require('../middleware')
const getAllImages = require('../services/ImageScraper')
const downloadImages = require('../services/ImageDownloader')

router.get('/download', async (req, res) => {
    let output = fs.createWriteStream(__dirname + '/example.zip')
    downloadImages(output, images)
    output.on('close', function () {
        res.download(__dirname + '/example.zip')
    })
})

router.get('/scrape/:url', cache, async (req, res) => {
    req.setTimeout(0)
    const url = decodeURIComponent(req.params.url)

    const response = await axios.get(url)
    const headers = response.headers
    const lastModified = headers['last-modified']

    console.log(url)
    const links = await getAllImages(url)

    const images = { images: links }

    client.set(url, JSON.stringify({ ...images, lastModified: lastModified }))

    res.json(images)
})

module.exports = router
